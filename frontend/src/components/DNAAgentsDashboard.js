import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './DNAAgentsDashboard.css';
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
} from '../data/dnaAgents';
import { callGeminiAgent } from '../services/geminiClient';
import EscalationMap from './EscalationMap';

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

const FieldRenderer = ({ field, value, onChange }) => {
  if (field.type === 'select') {
    return (
      <select value={value} onChange={(e) => onChange(field.name, e.target.value)}>
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

const DNAAgentsDashboard = () => {
  const navigate = useNavigate();
  const { agentId } = useParams();
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('geneGuardAgentsTheme') || 'light');
  const [patient, setPatient] = useState(defaultPatient);
  const selectedAgent = useMemo(() => getAgentById(agentId) || dnaAgentConfigs[0], [agentId]);
  const [agentConfigs, setAgentConfigs] = useState(dnaAgentConfigs);
  const [formData, setFormData] = useState(() => defaultValuesFor(selectedAgent, defaultPatient));
  const [evaluation, setEvaluation] = useState(() => evaluatePatient(defaultPatient));
  const [output, setOutput] = useState(() => runAgent(selectedAgent.id, defaultValuesFor(selectedAgent, defaultPatient), defaultPatient));
  const [apiState, setApiState] = useState('fallback');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('geneGuardAgentsTheme');
    if (savedTheme) setThemeMode(savedTheme);
    const savedPatient = localStorage.getItem('geneGuardPatientProfile');
    if (savedPatient) {
      const parsed = { ...defaultPatient, ...JSON.parse(savedPatient) };
      setPatient(parsed);
      const evaluated = evaluatePatient(parsed);
      setEvaluation(evaluated);
      setFormData(defaultValuesFor(selectedAgent, parsed));
      setOutput(runAgent(selectedAgent.id, defaultValuesFor(selectedAgent, parsed), parsed));
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
    const defaults = defaultValuesFor(selectedAgent, patient);
    setFormData(defaults);
    setOutput(runAgent(selectedAgent.id, defaults, patient));
  }, [selectedAgent, patient]);

  useEffect(() => {
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
  }, [patient]);

  const handleChange = (name, value) => setFormData((prev) => ({ ...prev, [name]: value }));

  const handleRun = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('🔵 handleRun called with:', { selectedAgent: selectedAgent.id, formData, patient });

    // Update evaluation immediately
    const freshEval = evaluatePatient({ ...patient, ...formData });
    setEvaluation(freshEval);

    // Strategy 1: Try Gemini directly from frontend
    try {
      console.log('🟡 Attempting Gemini direct call...');
      const geminiOutput = await callGeminiAgent(selectedAgent.id, formData, patient);
      if (geminiOutput) {
        // For escalation agent, preserve emergency data
        if (selectedAgent.id === 'escalation-agent') {
          const fallbackData = runAgent(selectedAgent.id, formData, patient);
          geminiOutput.emergency = fallbackData.emergency;
        }
        setOutput(geminiOutput);
        setApiState('connected');
        setIsLoading(false);
        console.log('🟢 Gemini direct call succeeded');
        return;
      }
    } catch (geminiErr) {
      console.warn('🟠 Gemini direct call failed:', geminiErr.message);
    }

    // Strategy 2: Try backend API
    try {
      const response = await fetch(`${API_BASE}/run/${selectedAgent.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, patient }),
      });
      const data = await response.json();
      console.log('🟢 Backend API Response:', data);
      if (data?.success) {
        setOutput(data.output);
        if (data.evaluation) setEvaluation(data.evaluation);
        setApiState('connected');
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error('🔴 Backend API Error:', error.message);
    }

    // Strategy 3: Rule-based fallback
    console.log('⚪ Using rule-based fallback');
    const fallback = runAgent(selectedAgent.id, formData, patient);
    setOutput(fallback);
    setApiState('fallback');
    setIsLoading(false);
  };

  const mergedPatient = { ...patient, ...formData };
  const lineSeries = evaluation.timeline || buildTimelineSeries(mergedPatient, evaluation);
  const emergencyData = output.emergency || {
    active: evaluation.alertActive,
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
            <div className={`dna-status-pill ${evaluation.level.toLowerCase()}`}>{evaluation.level} profile</div>
            <div className={`api-pill ${apiState}`}>{apiState === 'connected' ? 'API connected' : 'Fallback mode'}</div>
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
                  <button type="submit" className="dna-agents-primary-btn" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="dna-loading-spinner"></span>
                        Analyzing with AI…
                      </>
                    ) : 'Run agent'}
                  </button>
                  <button type="button" className="dna-agents-outline-btn" onClick={() => setFormData(defaultValuesFor(selectedAgent, patient))} disabled={isLoading}>Reset inputs</button>
                </div>
              </form>
            </div>

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
                    {output.aiEnhanced && <span className="dna-ai-badge">✨ AI-Enhanced</span>}
                  </div>
                  <div className="dna-output-status">{output.status}</div>
                </div>
                {isLoading ? (
                  <div className="dna-loading-container">
                    <div className="dna-loading-spinner large"></div>
                    <p>Analyzing your data with Gemini AI…</p>
                  </div>
                ) : (
                  <>
                    <div className="dna-ai-summary">
                      {output.aiEnhanced ? (
                        <div className="dna-ai-response-text" dangerouslySetInnerHTML={{
                          __html: output.summary
                            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                            .replace(/^[-•]\s+(.+)$/gm, '<li>$1</li>')
                            .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
                            .replace(/<\/ul>\s*<ul>/g, '')
                            .replace(/\n{2,}/g, '</p><p>')
                            .replace(/\n/g, '<br/>')
                        }} />
                      ) : (
                        <p>{output.summary}</p>
                      )}
                    </div>
                    <div className="dna-output-highlight-grid">
                      {(output.highlights || []).slice(0, 4).map((item, index) => {
                        const detail = typeof item === 'string' ? { label: `Insight ${index + 1}`, value: item } : item;
                        return (
                          <div key={`${detail.label}-${index}`} className="dna-highlight-card">
                            <span>{detail.label}</span>
                            <strong>{detail.value}</strong>
                          </div>
                        );
                      })}
                    </div>
                    <div className="dna-next-step-list">
                      {(output.nextSteps || []).map((step) => <div key={step}>{step}</div>)}
                    </div>
                  </>
                )}
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

                {/* Interactive Map for Escalation Agent */}
                {selectedAgent.id === 'escalation-agent' && (
                  <EscalationMap
                    locationHint={emergencyData.location}
                    isEmergency={emergencyData.active}
                  />
                )}

                <div className="dna-emergency-actions">
                  <a className="dna-action-btn" href={emergencyData.mapUrl} target="_blank" rel="noreferrer">Open in Google Maps</a>
                  <a className="dna-action-btn" href={emergencyData.telUrl}>Call contact</a>
                  <a className="dna-action-btn" href={emergencyData.smsUrl}>Send SMS</a>
                </div>
                <p className="dna-emergency-note">On mobile or supported devices, call and SMS buttons open the phone dialer or messaging app directly.</p>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default DNAAgentsDashboard;
