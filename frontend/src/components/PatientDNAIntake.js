import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PatientDNAIntake.css';
import { evaluatePatient } from '../data/dnaAgents';

const patientDefaults = {
  fullName: '',
  age: '',
  sex: 'Female',
  bloodGroup: 'O+',
  mobileNumber: '',
  email: '',
  familyHistory: 'No',
  familyMemberCount: '0',
  familyMemberRelation: '',
  knownDisorder: '',
  symptoms: 'No symptoms',
  purpose: 'General awareness',
  reportRisk: 'Low',
  samplePreference: 'Saliva',
  fastingStatus: 'Yes',
  consultedDoctor: 'No',
  medications: '',
  allergies: '',
  location: 'Mumbai',
  emergencyContactName: '',
  emergencyContact: '',
};

const API_BASE = 'http://localhost:5050/api/dna';

const MiniMetric = ({ label, value }) => (
  <div className="patient-metric-mini">
    <span>{label}</span>
    <strong>{value}%</strong>
  </div>
);

const IntakeField = ({ label, children, full = false }) => (
  <label className={`patient-field ${full ? 'full' : ''}`}>
    <span>{label}</span>
    {children}
  </label>
);

const PatientDNAIntake = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(patientDefaults);
  const [evaluation, setEvaluation] = useState(() => evaluatePatient(patientDefaults));
  const [apiMode, setApiMode] = useState('fallback');

  useEffect(() => {
    const saved = localStorage.getItem('geneGuardPatientProfile');
    if (saved) {
      setFormData({ ...patientDefaults, ...JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        const response = await fetch(`${API_BASE}/patient/evaluate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ patient: formData }),
        });
        const data = await response.json();
        if (data?.success) {
          setEvaluation(data.evaluation);
          setApiMode('connected');
          return;
        }
      } catch (error) {}
      setEvaluation(evaluatePatient(formData));
      setApiMode('fallback');
    };
    run();
  }, [formData]);

  const handleChange = (name, value) => setFormData((prev) => ({ ...prev, [name]: value }));

  const keyTags = useMemo(() => {
    return [formData.purpose, formData.familyHistory === 'Yes' ? 'Family history present' : 'No family history', formData.samplePreference, evaluation.level]
      .filter(Boolean)
      .slice(0, 4);
  }, [formData, evaluation]);

  const handleContinue = () => {
    localStorage.setItem('geneGuardPatientProfile', JSON.stringify(formData));
    navigate('/dna/agents/guidance-agent');
  };

  return (
    <div className="patient-intake-page">
      <section className="patient-intake-hero">
        <div className="patient-intake-hero-inner">
          <div>
            <span className="patient-badge">Patient DNA Intake</span>
            <h1>Create a richer patient profile</h1>
            <p>
              Add patient, family, and sampling details once. The DNA dashboard, charts, escalation panel, and all agents update from this profile.
            </p>
          </div>
          <div className="patient-hero-actions">
            <Link to="/dna" className="patient-outline-btn">← Back to DNA Testing</Link>
            <button className="patient-primary-btn" onClick={handleContinue}>Open dynamic dashboard</button>
          </div>
        </div>
      </section>

      <section className="patient-intake-layout">
        <div className="patient-card form-card">
          <div className="patient-card-head">
            <div>
              <span className="patient-badge small">Input Form</span>
              <h2>Patient + family + sampling data</h2>
            </div>
            <div className={`patient-api-pill ${apiMode}`}>{apiMode === 'connected' ? 'API connected' : 'Fallback mode'}</div>
          </div>

          <div className="patient-section-title">Basic identity</div>
          <div className="patient-form-grid three-col">
            <IntakeField label="Full name">
              <input value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} placeholder="Enter patient name" />
            </IntakeField>
            <IntakeField label="Age">
              <input type="number" value={formData.age} onChange={(e) => handleChange('age', e.target.value)} placeholder="Enter age" />
            </IntakeField>
            <IntakeField label="Sex">
              <select value={formData.sex} onChange={(e) => handleChange('sex', e.target.value)}>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </IntakeField>
            <IntakeField label="Blood group">
              <select value={formData.bloodGroup} onChange={(e) => handleChange('bloodGroup', e.target.value)}>
                {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map((item) => <option key={item}>{item}</option>)}
              </select>
            </IntakeField>
            <IntakeField label="Mobile number">
              <input value={formData.mobileNumber} onChange={(e) => handleChange('mobileNumber', e.target.value)} placeholder="Enter phone number" />
            </IntakeField>
            <IntakeField label="Email">
              <input value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="Enter email" />
            </IntakeField>
          </div>

          <div className="patient-section-title">Family history</div>
          <div className="patient-form-grid three-col">
            <IntakeField label="Family history of genetic disorder?">
              <select value={formData.familyHistory} onChange={(e) => handleChange('familyHistory', e.target.value)}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </IntakeField>
            <IntakeField label="Affected family member count">
              <input type="number" value={formData.familyMemberCount} onChange={(e) => handleChange('familyMemberCount', e.target.value)} placeholder="0" />
            </IntakeField>
            <IntakeField label="Family member relation">
              <input value={formData.familyMemberRelation} onChange={(e) => handleChange('familyMemberRelation', e.target.value)} placeholder="Mother, father, sibling..." />
            </IntakeField>
            <IntakeField label="Known disorder in family" full>
              <input value={formData.knownDisorder} onChange={(e) => handleChange('knownDisorder', e.target.value)} placeholder="Example: Thalassemia, BRCA mutation history" />
            </IntakeField>
          </div>

          <div className="patient-section-title">Testing + health details</div>
          <div className="patient-form-grid three-col">
            <IntakeField label="Symptoms">
              <select value={formData.symptoms} onChange={(e) => handleChange('symptoms', e.target.value)}>
                <option>No symptoms</option>
                <option>Mild symptoms</option>
                <option>Recurring symptoms</option>
                <option>Severe</option>
              </select>
            </IntakeField>
            <IntakeField label="Purpose of test">
              <select value={formData.purpose} onChange={(e) => handleChange('purpose', e.target.value)}>
                <option>General awareness</option>
                <option>Health risk check</option>
                <option>Inherited disease concern</option>
                <option>Family planning</option>
              </select>
            </IntakeField>
            <IntakeField label="Observed report risk">
              <select value={formData.reportRisk} onChange={(e) => handleChange('reportRisk', e.target.value)}>
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
            </IntakeField>
            <IntakeField label="Preferred sample type">
              <select value={formData.samplePreference} onChange={(e) => handleChange('samplePreference', e.target.value)}>
                <option>Saliva</option>
                <option>Blood</option>
                <option>Not sure</option>
              </select>
            </IntakeField>
            <IntakeField label="Followed food restriction?">
              <select value={formData.fastingStatus} onChange={(e) => handleChange('fastingStatus', e.target.value)}>
                <option>Yes</option>
                <option>No</option>
              </select>
            </IntakeField>
            <IntakeField label="Doctor already consulted?">
              <select value={formData.consultedDoctor} onChange={(e) => handleChange('consultedDoctor', e.target.value)}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </IntakeField>
            <IntakeField label="Current medications">
              <input value={formData.medications} onChange={(e) => handleChange('medications', e.target.value)} placeholder="Mention current medicines" />
            </IntakeField>
            <IntakeField label="Allergies">
              <input value={formData.allergies} onChange={(e) => handleChange('allergies', e.target.value)} placeholder="Mention known allergies" />
            </IntakeField>
            <IntakeField label="Current location">
              <input value={formData.location} onChange={(e) => handleChange('location', e.target.value)} placeholder="City or area" />
            </IntakeField>
          </div>

          <div className="patient-section-title">Emergency support</div>
          <div className="patient-form-grid three-col">
            <IntakeField label="Emergency contact name">
              <input value={formData.emergencyContactName} onChange={(e) => handleChange('emergencyContactName', e.target.value)} placeholder="Enter contact name" />
            </IntakeField>
            <IntakeField label="Emergency contact number">
              <input value={formData.emergencyContact} onChange={(e) => handleChange('emergencyContact', e.target.value)} placeholder="Enter emergency number" />
            </IntakeField>
          </div>
        </div>

        <div className="patient-card summary-card">
          <div className="patient-summary-top">
            <div>
              <span className="patient-badge small">Live evaluation</span>
              <h2>{evaluation.level} risk profile</h2>
              <p>{evaluation.summary}</p>
            </div>
            <div className={`patient-risk-pill ${evaluation.level.toLowerCase()}`}>{evaluation.lane}</div>
          </div>

          <div className="patient-tags">
            {keyTags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>

          <div className="patient-mini-grid">
            {evaluation.charts.slice(0, 4).map((metric) => <MiniMetric key={metric.label} label={metric.label} value={metric.value} />)}
          </div>

          <div className="patient-summary-list">
            <div><strong>Sample type:</strong> {formData.samplePreference}</div>
            <div><strong>Family relation:</strong> {formData.familyMemberRelation || 'Not provided'}</div>
            <div><strong>Known disorder:</strong> {formData.knownDisorder || 'Not provided'}</div>
            <div><strong>Emergency contact:</strong> {formData.emergencyContactName || 'Not provided'} {formData.emergencyContact ? `· ${formData.emergencyContact}` : ''}</div>
          </div>

          <div className="patient-alert-box">
            <strong>{evaluation.alertActive ? 'Escalation watch is active.' : 'No emergency escalation right now.'}</strong>
            <p>
              Save this profile and open the dashboard to see the risk graph, agent-specific response, alert controls, map button, and emergency actions update automatically.
            </p>
            <button className="patient-primary-btn full-width-btn" onClick={handleContinue}>Continue to dashboard</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientDNAIntake;
