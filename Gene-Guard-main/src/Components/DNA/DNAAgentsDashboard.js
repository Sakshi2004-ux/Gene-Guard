import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './DNAAgentsDashboard.css';

const LazyEscalationMap = React.lazy(() => import('./EscalationMap'));
import {
  buildOpenMapUrl,
  buildSmsUrl,
  buildTelUrl,
  buildTimelineSeries,
  dnaAgentConfigs,
  evaluatePatient,
  getAgentById,
  runAgent,
  titleCase,
} from '../../data/dnaAgents';
import { callGeminiDirect, isGeminiAvailable } from '../../services/geminiDirectService';
import { parseMarkdown } from '../../utils/formatters';

const API_BASE = 'http://localhost:5050/api/dna';

const defaultPatient = {
  fullName: 'Guest Patient',
  age: '24',
  sex: 'Female',
  bloodGroup: 'O+',
  familyHistory: 'No',
  familyMemberCount: '0',
  familyMemberRelation: '',
  knownDisorder: '',
  symptoms: 'No symptoms',
  purpose: 'General awareness',
  reportRisk: 'Low',
  samplePreference: 'Saliva',
  fastingStatus: 'Yes',
  location: 'Mumbai',
  emergencyContactName: 'Emergency Contact',
  emergencyContact: '9876543210',
  consultedDoctor: 'No',
  medications: '',
};

const defaultValuesFor = (agent, patient = defaultPatient) =>
  agent.inputs.reduce((acc, input) => {
    const incoming = patient[input.name];
    acc[input.name] = incoming || (input.type === 'select' ? input.options[0] : '');
    return acc;
  }, {});

const emptyValuesFor = (agent) =>
  agent.inputs.reduce((acc, input) => {
    acc[input.name] = '';
    return acc;
  }, {});

const FieldRenderer = ({ field, value, onChange }) => {
  if (field.type === 'select') {
    return (
      <select value={value} onChange={(e) => onChange(field.name, e.target.value)}>
        <option value="" disabled>Select…</option>
        {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  }
  if (field.type === 'textarea') {
    return <textarea value={value} rows={4} placeholder={field.placeholder || ''} onChange={(e) => onChange(field.name, e.target.value)} />;
  }
  return <input type={field.type} value={value} placeholder={field.placeholder || ''} min={field.min} max={field.max} onChange={(e) => onChange(field.name, e.target.value)} />;
};

const ScoreCard = ({ label, value }) => (
  <div className="dna-score-card">
    <span>{label}</span>
    <strong>{value}%</strong>
  </div>
);

const TrendChart = ({ series }) => {
  const width = 420;
  const height = 170;
  const padding = 22;
  const stepX = (width - padding * 2) / Math.max(1, series.length - 1);
  const points = series.map((item, index) => {
    const x = padding + index * stepX;
    const y = height - padding - (item.value / 100) * (height - padding * 2);
    return { ...item, x, y };
  });
  const polyline = points.map((point) => `${point.x},${point.y}`).join(' ');
  const area = `M ${points[0]?.x || 0} ${height - padding} L ${polyline} L ${points[points.length - 1]?.x || 0} ${height - padding} Z`;

  return (
    <div className="dna-chart-wrap">
      <svg viewBox={`0 0 ${width} ${height}`} className="dna-line-chart" role="img" aria-label="DNA risk trend chart">
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = height - padding - (tick / 100) * (height - padding * 2);
          return <line key={tick} x1={padding} y1={y} x2={width - padding} y2={y} className="dna-grid-line" />;
        })}
        <path d={area} className="dna-area-fill" />
        <polyline points={polyline} className="dna-line-path" />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="5" className="dna-line-point" />
            <text x={point.x} y={height - 6} textAnchor="middle" className="dna-axis-text">{point.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const RotatingLoader = () => {
  const messages = ['Analyzing your inputs...', 'Consulting AI...', 'Preparing results...'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dna-empty-state">
      <div className="dna-empty-state-icon loader-pulse">⏳</div>
      <h3>{messages[index]}</h3>
      <p>This usually takes a few seconds.</p>
    </div>
  );
};

const DNAAgentsDashboard = () => {
  const navigate = useNavigate();
  const { agentId } = useParams();
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('geneGuardAgentsTheme') || 'light');
  const [patient, setPatient] = useState(defaultPatient);
  const selectedAgent = useMemo(() => getAgentById(agentId) || dnaAgentConfigs[0], [agentId]);
  const [agentConfigs, setAgentConfigs] = useState(dnaAgentConfigs);
  const [formData, setFormData] = useState(() => emptyValuesFor(selectedAgent));
  const [evaluation, setEvaluation] = useState(null);
  const [output, setOutput] = useState(null);
  const [apiState, setApiState] = useState('fallback');
  const [hasRun, setHasRun] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('geneGuardAgentsTheme');
    if (savedTheme) setThemeMode(savedTheme);
    const savedPatient = localStorage.getItem('geneGuardPatientProfile');
    if (savedPatient) {
      const parsed = { ...defaultPatient, ...JSON.parse(savedPatient) };
      setPatient(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('geneGuardAgentsTheme', themeMode);
  }, [themeMode]);

  useEffect(() => {
    const loadConfigs = async () => {
      try {
        const response = await fetch(`${API_BASE}/configs`);
        const data = await response.json();
        if (data?.success && Array.isArray(data.agents)) {
          setAgentConfigs(data.agents);
          setApiState('connected');
        }
      } catch (error) {
        setApiState('fallback');
      }
    };
    loadConfigs();
  }, []);

  useEffect(() => {
    setFormData(emptyValuesFor(selectedAgent));
    setOutput(null);
    setEvaluation(null);
    setHasRun(false);
    setValidationError('');
  }, [selectedAgent]);

  useEffect(() => {
    if (!hasRun) return;
    const evaluateViaApi = async () => {
      try {
        const response = await fetch(`${API_BASE}/patient/evaluate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ patient }),
        });
        const data = await response.json();
        if (data?.success) {
          setEvaluation(data.evaluation);
          setApiState('connected');
          return;
        }
      } catch (error) {}
      setEvaluation(evaluatePatient(patient));
    };
    evaluateViaApi();
  }, [patient, hasRun]);

  const handleChange = (name, value) => setFormData((prev) => ({ ...prev, [name]: value }));

  const handleRun = async (e) => {
    e.preventDefault();
    setValidationError('');

    // Fix 3 — Validate required fields
    const emptyFields = selectedAgent.inputs
      .filter((field) => !formData[field.name]?.toString().trim())
      .map((field) => field.label);
    if (emptyFields.length > 0) {
      setValidationError(`Please fill in: ${emptyFields.join(', ')}`);
      return;
    }

    setIsRunning(true);
    console.log('🔵 handleRun called with:', { selectedAgent: selectedAgent.id, formData, patient });

    // Helper: persist agent result to localStorage for Genetic Assessment AI chatbot
    const saveAgentResultToLocalStorage = (agentId, result) => {
      try {
        const existing = JSON.parse(localStorage.getItem('geneGuardAgentResults') || '{}');
        existing[agentId] = result;
        localStorage.setItem('geneGuardAgentResults', JSON.stringify(existing));
      } catch (e) {
        console.warn('Failed to save agent result to localStorage:', e);
      }
    };

    // Tier 1 — Try Gemini direct from frontend
    if (isGeminiAvailable()) {
      try {
        console.log('🟣 Calling Gemini directly...');
        const geminiOutput = await callGeminiDirect(selectedAgent.id, formData, patient);
        setOutput(geminiOutput);
        setEvaluation(evaluatePatient({ ...patient, ...formData }));
        setApiState('gemini-direct');
        setHasRun(true);
        setIsRunning(false);
        saveAgentResultToLocalStorage(selectedAgent.id, geminiOutput);
        return;
      } catch (geminiError) {
        console.error('🔴 Gemini direct error:', geminiError.message);
      }
    }

    // Tier 2 — Try backend API (with 1 second timeout ping)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);
      const ping = await fetch(`${API_BASE.replace('/api/dna', '')}/health`, { signal: controller.signal }).catch(() => null);
      clearTimeout(timeoutId);
      
      if (ping && ping.ok) {
        const response = await fetch(`${API_BASE}/run/${selectedAgent.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData, patient }),
        });
        const data = await response.json();
        console.log('🟢 Backend API Response:', data);
        if (data?.success) {
          setOutput(data.output);
          setEvaluation(data.evaluation);
          setApiState('connected');
          setHasRun(true);
          setIsRunning(false);
          saveAgentResultToLocalStorage(selectedAgent.id, data.output);
          return;
        }
      } else {
        console.warn('🟠 Backend offline or timed out');
      }
    } catch (error) {
      console.warn('🟠 Backend offline:', error.message);
    }

    // Tier 3 — Template fallback (last resort)
    console.log('⚪ Using template fallback');
    const fallback = runAgent(selectedAgent.id, formData, patient);
    setOutput(fallback);
    setEvaluation(evaluatePatient({ ...patient, ...formData }));
    setApiState('fallback');
    setHasRun(true);
    setIsRunning(false);
    saveAgentResultToLocalStorage(selectedAgent.id, fallback);
  };

  const mergedPatient = { ...patient, ...formData };
  const lineSeries = evaluation?.timeline || (hasRun ? buildTimelineSeries(mergedPatient, evaluation) : []);
  const emergencyData = output?.emergency || {
    active: evaluation?.alertActive || false,
    contact: mergedPatient.emergencyContact,
    contactName: mergedPatient.emergencyContactName || 'Emergency contact',
    location: mergedPatient.location || 'Mumbai',
    mapUrl: buildOpenMapUrl(mergedPatient.location || 'Mumbai', { lat: 19.076, lng: 72.8777 }),
    telUrl: buildTelUrl(mergedPatient.emergencyContact || ''),
    smsUrl: buildSmsUrl(mergedPatient.emergencyContact || '', `Gene Guard alert for ${mergedPatient.fullName || 'the patient'}.`),
  };

  const patientCards = [
    { label: 'Patient', value: patient.fullName || 'Not provided' },
    { label: 'Blood group', value: patient.bloodGroup || 'Not provided' },
    { label: 'Family history', value: patient.familyHistory || 'Not provided' },
    { label: 'Sample type', value: patient.samplePreference || 'Not provided' },
  ];

  return (
    <div className={`dna-agents-page ${themeMode === 'dark' ? 'theme-dark' : ''}`}>
      <section className="dna-agents-hero">
        <div className="dna-agents-hero-inner">
          <div>
            <span className="dna-agents-badge">Dynamic DNA Workflow Agents</span>
            <h1>DNA Testing Agent Dashboard</h1>
            <p>
              Cleaner dashboard, richer patient profile, live chart, emergency actions, and dark or light mode inside the agents section.
            </p>
          </div>
          <div className="dna-agents-hero-actions">
            <Link to="/dna" className="dna-agents-outline-btn">← Back to DNA Testing</Link>
            <Link to="/dna/patient-intake" className="dna-agents-primary-btn">Edit patient intake</Link>
            <div className="dna-theme-toggle">
              <button className={themeMode === 'light' ? 'active' : ''} onClick={() => setThemeMode('light')}>Light</button>
              <button className={themeMode === 'dark' ? 'active' : ''} onClick={() => setThemeMode('dark')}>Dark</button>
            </div>
          </div>
        </div>
      </section>

      <section className="dna-agents-shell">
        <div className="dna-top-strip">
          <div className="dna-top-strip-left">
            {patientCards.map((item) => (
              <div key={item.label} className="dna-patient-chip-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <div className="dna-top-strip-right">
            <div className={`dna-status-pill ${(evaluation?.level || 'low').toLowerCase()}`}>{evaluation?.level || 'Pending'} profile</div>
            <div className={`api-pill ${apiState}`}>{apiState === 'connected' ? 'API connected' : apiState === 'gemini-direct' ? 'Gemini AI' : 'Fallback mode'}</div>
          </div>
        </div>

        <div className="dna-agents-layout">
          <aside className="dna-agents-sidebar">
            <div className="dna-agents-sidebar-card">
              <div className="panel-head">
                <div>
                  <span className="panel-kicker">Agent menu</span>
                  <h3>Available agents</h3>
                </div>
                <span className="panel-count">{agentConfigs.length}</span>
              </div>
              <div className="dna-agents-list">
                {agentConfigs.map((agent) => (
                  <button key={agent.id} className={`dna-agent-link-card ${selectedAgent.id === agent.id ? 'active' : ''}`} onClick={() => navigate(`/dna/agents/${agent.id}`)}>
                    <div className="dna-agent-link-icon">{agent.icon}</div>
                    <div>
                      <h4>{agent.name}</h4>
                      <p>{agent.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="dna-agents-main">
            <div className="dna-agents-main-card">
              <div className="panel-head">
                <div>
                  <span className="panel-kicker">Selected agent</span>
                  <h2>{selectedAgent.icon} {selectedAgent.name}</h2>
                  <p>{selectedAgent.purpose}</p>
                </div>
                <div className="dna-agent-mini-points">
                  {selectedAgent.quickPoints.map((point) => <span key={point}>{point}</span>)}
                </div>
              </div>

              <form className="dna-agent-form-grid" onSubmit={handleRun}>
                {selectedAgent.inputs.map((field) => (
                  <label key={field.name} className={`dna-agent-field ${field.type === 'textarea' ? 'full-width' : ''}`}>
                    <span>{field.label}</span>
                    <FieldRenderer field={field} value={formData[field.name] || ''} onChange={handleChange} />
                  </label>
                ))}
                <div className="dna-agent-actions full-width">
                  <button type="submit" className="dna-agents-primary-btn" disabled={isRunning}>{isRunning ? 'Running…' : 'Run agent'}</button>
                  <button type="button" className="dna-agents-outline-btn" disabled={isRunning} onClick={() => { setFormData(emptyValuesFor(selectedAgent)); setOutput(null); setEvaluation(null); setHasRun(false); setValidationError(''); }}>Reset inputs</button>
                </div>
                {validationError && <p style={{ color: '#b53535', fontWeight: 600, gridColumn: '1 / -1', margin: '0.5rem 0 0' }}>{validationError}</p>}
              </form>
            </div>

            {isRunning ? (
            <RotatingLoader />
            ) : hasRun && output && evaluation ? (
            <div className="dna-dashboard-grid">
              <div className="dna-summary-card">
                <div className="panel-head compact">
                  <div>
                    <span className="panel-kicker">Live dashboard</span>
                    <h3>{evaluation.lane}</h3>
                  </div>
                </div>
                <div className="dna-score-grid">
                  {evaluation.charts.slice(0, 4).map((metric) => <ScoreCard key={metric.label} label={metric.label} value={metric.value} />)}
                </div>
              </div>

              <div className="dna-chart-card-large">
                <div className="panel-head compact">
                  <div>
                    <span className="panel-kicker">Risk trend</span>
                    <h3>Patient journey view</h3>
                  </div>
                </div>
                <TrendChart series={lineSeries} />
              </div>

              <div className="dna-output-card-clean">
                <div className="panel-head compact">
                  <div>
                    <span className="panel-kicker">Agent result</span>
                    <h3>{output.title}</h3>
                    <div className="dna-ai-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(output.summary) }} />
                  </div>
                  <div className="dna-output-status">{output.status}</div>
                </div>
                <div className="dna-output-highlight-grid">
                  {(output.highlights || []).slice(0, 4).map((item, index) => {
                    const detail = typeof item === 'string' ? { label: `Insight ${index + 1}`, value: item } : item;
                    return (
                      <div key={`${detail.label}-${index}`} className="dna-highlight-card">
                        <span>{detail.label}</span>
                        <strong className="dna-ai-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(String(detail.value || '')) }} />
                      </div>
                    );
                  })}
                </div>
                <div className="dna-next-step-list">
                  {(output.nextSteps || []).map((step, i) => <div key={i} className="dna-ai-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(step) }} />)}
                </div>
              </div>

              <div className="dna-emergency-card">
                <div className="panel-head compact">
                  <div>
                    <span className="panel-kicker">Escalation support</span>
                    <h3>{emergencyData.active ? 'Emergency action ready' : 'Support controls ready'}</h3>
                  </div>
                  <div className={`dna-status-pill ${emergencyData.active ? 'high' : evaluation.level.toLowerCase()}`}>{emergencyData.active ? 'Alert active' : 'Standby'}</div>
                </div>
                <div className="dna-emergency-info-grid">
                  <div className="dna-emergency-line"><span>Contact</span><strong>{emergencyData.contactName || 'Emergency contact'} · {emergencyData.contact || 'Not provided'}</strong></div>
                  <div className="dna-emergency-line"><span>Location</span><strong>{emergencyData.location}</strong></div>
                </div>
                {selectedAgent.id === 'escalation-agent' && (
                  <div className="dna-map-box">
                    <React.Suspense fallback={<div className="dna-map-loading">Loading map…</div>}>
                      <LazyEscalationMap />
                    </React.Suspense>
                  </div>
                )}
                <div className="dna-emergency-actions">
                  <a className="dna-action-btn" href={emergencyData.telUrl}>Call contact</a>
                  <a className="dna-action-btn" href={emergencyData.smsUrl}>Send SMS</a>
                </div>
                <p className="dna-emergency-note">On mobile or supported devices, call and SMS buttons open the phone dialer or messaging app directly.</p>
              </div>
            </div>
            ) : (
            <div className="dna-empty-state">
              <div className="dna-empty-state-icon">📋</div>
              <h3>No results yet</h3>
              <p>Fill in the details above and click <strong>Run agent</strong> to see results.</p>
            </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
};

export default DNAAgentsDashboard;
