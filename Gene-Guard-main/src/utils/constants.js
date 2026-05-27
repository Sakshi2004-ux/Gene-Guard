/**
 * Frontend Constants
 * Centralized configuration and constants for the application
 */

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050/api';
export const BACKEND_HEALTH_URL = `${API_BASE_URL.replace('/api', '')}/health`;

// DNA Agent IDs
export const AGENT_IDS = {
  REPORT_SIMPLIFIER: 'report-simplifier-agent',
  RECOMMENDATION: 'recommendation-agent',
  GUIDANCE: 'guidance-agent',
  TEST_SUGGESTION: 'test-suggestion-agent',
  SAMPLE_PROCESS: 'sample-process-agent',
  ESCALATION: 'escalation-agent',
};

// Agent Names (for display)
export const AGENT_NAMES = {
  'report-simplifier-agent': 'Report Simplifier',
  'recommendation-agent': 'Recommendation',
  'guidance-agent': 'Guidance',
  'test-suggestion-agent': 'Test Suggestion',
  'sample-process-agent': 'Sample Process',
  'escalation-agent': 'Escalation',
};

// Risk Levels
export const RISK_LEVELS = {
  LOW: 'Low',
  MODERATE: 'Moderate',
  HIGH: 'High',
  CRITICAL: 'Critical',
};

// Test Types
export const TEST_TYPES = [
  'Health risk screening',
  'Carrier screening',
  'Hereditary disorder testing',
  'Lifestyle / wellness',
];

// Sample Preferences
export const SAMPLE_PREFERENCES = [
  'Saliva',
  'Blood',
  'Not sure',
];

// Shipping Modes
export const SHIPPING_MODES = [
  'Home kit pickup',
  'Self courier',
  'Hospital / clinic visit',
];

// Urgency Levels
export const URGENCY_LEVELS = [
  'Routine',
  'Soon',
  'Urgent',
];

// Blood Groups
export const BLOOD_GROUPS = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-',
];

// Yes/No Options
export const YES_NO = ['Yes', 'No'];

export default {
  API_BASE_URL,
  BACKEND_HEALTH_URL,
  AGENT_IDS,
  AGENT_NAMES,
  RISK_LEVELS,
  TEST_TYPES,
  SAMPLE_PREFERENCES,
  SHIPPING_MODES,
  URGENCY_LEVELS,
  BLOOD_GROUPS,
  YES_NO,
};
