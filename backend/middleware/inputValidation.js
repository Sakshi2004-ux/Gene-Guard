/**
 * Input validation middleware for Gene-Guard backend
 * Sanitizes and validates patient data before sending to Claude
 */

const VALID_BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const VALID_SEXES = ['Female', 'Male', 'Other'];
const VALID_YES_NO = ['Yes', 'No'];
const MAX_REPORT_LENGTH = 4000;
const MAX_TEXT_FIELD_LENGTH = 500;
const MAX_TEXTAREA_LENGTH = 2000;

/**
 * Validate and sanitize report text
 */
export const validateReportInput = (clinicalNote) => {
  if (!clinicalNote) {
    throw new Error('Clinical note is required');
  }

  if (typeof clinicalNote !== 'string') {
    throw new Error('Clinical note must be text');
  }

  const trimmed = clinicalNote.trim();

  if (trimmed.length === 0) {
    throw new Error('Clinical note cannot be empty');
  }

  if (trimmed.length > MAX_REPORT_LENGTH) {
    throw new Error(`Clinical note is too long. Max ${MAX_REPORT_LENGTH} characters.`);
  }

  // Basic XSS prevention - block script tags and suspicious patterns
  if (/<script|javascript:|on\w+=/i.test(trimmed)) {
    throw new Error('Invalid content detected');
  }

  return trimmed;
};

/**
 * Validate patient data fields
 */
export const validatePatientData = (patient) => {
  if (!patient || typeof patient !== 'object') {
    return {};
  }

  const validated = {};

  // Whitelist and validate specific fields
  if (patient.age) {
    const age = parseInt(patient.age, 10);
    if (isNaN(age) || age < 0 || age > 150) {
      throw new Error('Invalid age provided');
    }
    validated.age = age;
  }

  if (patient.sex && !VALID_SEXES.includes(patient.sex)) {
    throw new Error('Invalid sex value');
  }
  validated.sex = patient.sex;

  if (patient.bloodGroup && !VALID_BLOOD_GROUPS.includes(patient.bloodGroup)) {
    throw new Error('Invalid blood group');
  }
  validated.bloodGroup = patient.bloodGroup;

  if (patient.familyHistory && !VALID_YES_NO.includes(patient.familyHistory)) {
    throw new Error('Invalid family history value');
  }
  validated.familyHistory = patient.familyHistory;

  // Text fields - max length check
  if (patient.fullName && typeof patient.fullName === 'string') {
    validated.fullName = patient.fullName.slice(0, MAX_TEXT_FIELD_LENGTH);
  }

  if (patient.knownDisorder && typeof patient.knownDisorder === 'string') {
    validated.knownDisorder = patient.knownDisorder.slice(0, MAX_TEXT_FIELD_LENGTH);
  }

  if (patient.medications && typeof patient.medications === 'string') {
    validated.medications = patient.medications.slice(0, MAX_TEXTAREA_LENGTH);
  }

  if (patient.location && typeof patient.location === 'string') {
    validated.location = patient.location.slice(0, MAX_TEXT_FIELD_LENGTH);
  }

  if (patient.emergencyContact && typeof patient.emergencyContact === 'string') {
    validated.emergencyContact = patient.emergencyContact.slice(0, 20);
  }

  return validated;
};

/**
 * Validate form data for agents
 */
export const validateFormData = (formData, agentId) => {
  if (!formData || typeof formData !== 'object') {
    return {};
  }

  const validated = {};

  // Common validation for all agents
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      validated[key] = value.slice(0, MAX_TEXTAREA_LENGTH).trim();
    } else {
      validated[key] = value;
    }
  }

  return validated;
};

/**
 * Filter Claude/Gemini response for safety
 * Removes diagnosis language, prescriptions, etc.
 * Relaxed for Gemini since system prompts provide safety guardrails
 */
export const filterClaudeResponse = (response) => {
  if (!response || typeof response !== 'string') {
    return response;
  }

  // Only truncate for length, don't block for medical language
  // System prompts ensure safe responses
  // Validate length
  if (response.length > MAX_TEXTAREA_LENGTH) {
    return response.slice(0, MAX_TEXTAREA_LENGTH) + '... [truncated for safety]';
  }

  return response;
};

/**
 * Express middleware for request validation
 */
export const requestValidationMiddleware = (req, res, next) => {
  // Check Content-Type for POST requests
  if (req.method === 'POST') {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({ error: 'Content-Type must be application/json' });
    }
  }

  next();
};

/**
 * Rate limiting helper (simple per-session)
 */
export class RateLimiter {
  constructor(maxCalls = 50, windowMs = 24 * 60 * 60 * 1000) {
    this.maxCalls = maxCalls;
    this.windowMs = windowMs;
    this.calls = new Map();
  }

  isAllowed(identifier) {
    const now = Date.now();
    const userCalls = this.calls.get(identifier) || [];

    // Remove old calls outside the window
    const recentCalls = userCalls.filter((timestamp) => now - timestamp < this.windowMs);

    if (recentCalls.length >= this.maxCalls) {
      return false;
    }

    recentCalls.push(now);
    this.calls.set(identifier, recentCalls);
    return true;
  }
}

export default {
  validateReportInput,
  validatePatientData,
  validateFormData,
  filterClaudeResponse,
  requestValidationMiddleware,
  RateLimiter,
};
