/**
 * API Client Service
 * Centralized API communication for all frontend requests
 *
 * Usage:
 *   import { apiClient } from './services/apiClient'
 *   apiClient.post('/dna/run/agent-id', {formData, patient}).then(...)
 *   apiClient.get('/dna/configs').then(...)
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050/api';

/**
 * Default headers for all API requests
 */
const defaultHeaders = {
  'Content-Type': 'application/json',
};

/**
 * Error handler wrapper
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `API Error: ${response.status}`);
  }
  return response.json();
};

/**
 * Main API Client Object
 */
export const apiClient = {
  /**
   * GET request
   * @param {string} endpoint - API endpoint (e.g. '/dna/configs')
   * @returns {Promise} - JSON response
   */
  get: async (endpoint) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`[API] GET ${endpoint}`);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: defaultHeaders,
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`[API Error] GET ${endpoint}:`, error.message);
      throw error;
    }
  },

  /**
   * POST request
   * @param {string} endpoint - API endpoint (e.g. '/dna/run/guidance-agent')
   * @param {object} data - Request body
   * @returns {Promise} - JSON response
   */
  post: async (endpoint, data = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`[API] POST ${endpoint}`, data);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`[API Error] POST ${endpoint}:`, error.message);
      throw error;
    }
  },

  /**
   * Run DNA Agent
   * Convenience method for running agent endpoints
   */
  runAgent: async (agentId, formData, patient) => {
    return apiClient.post(`/dna/run/${agentId}`, {
      formData,
      patient,
    });
  },

  /**
   * Get Agent Configurations
   */
  getAgentConfigs: async () => {
    return apiClient.get('/dna/configs');
  },

  /**
   * Evaluate Patient Profile
   */
  evaluatePatient: async (patient) => {
    return apiClient.post('/dna/patient/evaluate', { patient });
  },

  /**
   * Simplify Report (Direct Gemini Call)
   */
  simplifyReport: async (clinicalNote, geneName) => {
    return apiClient.post('/dna/simplify-report-ai', {
      clinicalNote,
      geneName,
    });
  },
};

/**
 * GET /health endpoint for connectivity check
 */
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
    return response.ok;
  } catch {
    return false;
  }
};

export default apiClient;
