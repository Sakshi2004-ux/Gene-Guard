/**
 * Claude API service wrapper for Gene-Guard
 * Handles all Claude API calls with error handling, token counting, and timeouts
 */

import Anthropic from '@anthropic-ai/sdk';
import {
  REPORT_SIMPLIFIER_SYSTEM_PROMPT,
  RECOMMENDATION_SYSTEM_PROMPT,
  GUIDANCE_SYSTEM_PROMPT,
  TEST_SUGGESTION_SYSTEM_PROMPT,
  SAMPLE_PROCESS_SYSTEM_PROMPT,
  ESCALATION_SYSTEM_PROMPT
} from '../config/systemPrompts.js';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Approximate token counter (rough estimate: 1 token ≈ 4 chars)
const estimateTokens = (text) => {
  return Math.ceil((text || '').length / 4);
};

// Max tokens we'll allow in a single request
const MAX_INPUT_TOKENS = 2000;
const MAX_OUTPUT_TOKENS = 1000;

/**
 * Call Claude for report simplification
 * Parses medical findings and explains in plain language
 */
export const callClaudeForReportSimplification = async (clinicalNote, geneName, patientContext = {}) => {
  try {
    // Check token budget
    const inputEstimate = estimateTokens(clinicalNote) + estimateTokens(geneName);
    if (inputEstimate > MAX_INPUT_TOKENS) {
      console.warn(`Token budget exceeded: ${inputEstimate} > ${MAX_INPUT_TOKENS}`);
      return null; // Fallback to rule-based
    }

    const userPrompt = `Please explain the following genetic finding in clear, patient-friendly language:

Finding Type: Gene/Mutation Marker
Gene/Marker Name: ${geneName}
Clinical Note: ${clinicalNote}

Patient Context:
- Age: ${patientContext.age || 'Not provided'}
- Symptoms: ${patientContext.symptoms || 'Not provided'}
- Family History: ${patientContext.familyHistory || 'Not provided'}

Please provide a clear explanation that:
1. Explains what this finding means in simple terms
2. Avoids medical jargon or explains it when necessary
3. Describes potential significance without diagnosing
4. Includes the mandatory disclaimers
5. Suggests next steps (consulting a genetic counselor/doctor)`;

    const response = await client.messages.create({
      model: 'claude-opus-4-1',
      max_tokens: MAX_OUTPUT_TOKENS,
      system: REPORT_SIMPLIFIER_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    if (response?.content && response.content.length > 0 && response.content[0].type === 'text') {
      return response.content[0].text;
    }

    return null;
  } catch (error) {
    console.error('Claude report simplification error:', error.message);
    // Log but don't throw - we'll fallback to rule-based
    return null;
  }
};

/**
 * Call Claude for personalized recommendations
 * Generates next steps based on patient profile and findings
 */
export const callClaudeForRecommendations = async (patientProfile = {}, reportFindings = '') => {
  try {
    const profileSummary = `
Patient Profile:
- Age: ${patientProfile.age || 'Unknown'}
- Sex: ${patientProfile.sex || 'Not provided'}
- Family History: ${patientProfile.familyHistory || 'No'}
- Known Disorders: ${patientProfile.knownDisorder || 'None known'}
- Current Medications: ${patientProfile.medications || 'None reported'}
- Doctor Consulted: ${patientProfile.consultedDoctor || 'No'}
- Symptoms: ${patientProfile.symptoms || 'No symptoms'}
- Purpose of Test: ${patientProfile.purpose || 'Not specified'}`;

    const inputEstimate = estimateTokens(profileSummary) + estimateTokens(reportFindings);
    if (inputEstimate > MAX_INPUT_TOKENS) {
      console.warn(`Token budget exceeded for recommendations: ${inputEstimate} > ${MAX_INPUT_TOKENS}`);
      return null; // Fallback
    }

    const userPrompt = `Based on the following patient profile and genetic test findings, suggest appropriate next steps:

${profileSummary}

Test Findings: ${reportFindings || 'Not provided'}

Please provide personalized guidance that:
1. Considers the patient's full context (age, family history, symptoms)
2. Suggests types of specialists to consider if relevant
3. Recommends monitoring or lifestyle awareness approaches
4. Highlights importance of medical consultation
5. Includes all mandatory disclaimers
6. Avoids prescribing specific treatments or medications`;

    const response = await client.messages.create({
      model: 'claude-opus-4-1',
      max_tokens: MAX_OUTPUT_TOKENS,
      system: RECOMMENDATION_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    if (response?.content && response.content.length > 0 && response.content[0].type === 'text') {
      return response.content[0].text;
    }

    return null;
  } catch (error) {
    console.error('Claude recommendation error:', error.message);
    return null;
  }
};

/**
 * Call Claude for pathway guidance
 * Helps patients clarify their testing needs through conversation
 */
export const callClaudeForGuidance = async (userInput, patientContext = {}) => {
  try {
    const contextSummary = `
Current Patient Context:
- Age: ${patientContext.age || 'Not specified'}
- Sex: ${patientContext.sex || 'Not specified'}
- Family History: ${patientContext.familyHistory || 'Not specified'}
- Current Concerns: ${patientContext.symptoms || 'Not specified'}
- Purpose for Testing: ${patientContext.purpose || 'Not specified'}`;

    const inputEstimate = estimateTokens(userInput) + estimateTokens(contextSummary);
    if (inputEstimate > MAX_INPUT_TOKENS) {
      return null; // Fallback
    }

    const userPrompt = `${contextSummary}

Patient Question/Concern: ${userInput}

Please respond conversationally to help the patient clarify their DNA testing needs. Ask clarifying questions if needed, explain testing categories, and help them understand what different tests can tell them.`;

    const response = await client.messages.create({
      model: 'claude-opus-4-1',
      max_tokens: MAX_OUTPUT_TOKENS,
      system: GUIDANCE_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    if (response?.content && response.content.length > 0 && response.content[0].type === 'text') {
      return response.content[0].text;
    }

    return null;
  } catch (error) {
    console.error('Claude guidance error:', error.message);
    return null;
  }
};

/**
 * Call Claude for intelligent test suggestion
 * Recommends specific DNA test based on full patient context
 */
export const callClaudeForTestSuggestion = async (patientProfile = {}, testContext = {}) => {
  try {
    const profileSummary = `
Patient Profile:
- Age: ${patientProfile.age || 'Unknown'}
- Sex: ${patientProfile.sex || 'Not provided'}
- Primary Goal: ${testContext.goal || 'Not specified'}
- Urgency Level: ${testContext.urgency || 'Routine'}
- Family History: ${patientProfile.familyHistory || 'No'}
- Known Disorders: ${patientProfile.knownDisorder || 'None known'}
- Blood Group: ${patientProfile.bloodGroup || 'Not provided'}
- Has Previous Report: ${testContext.reportAvailable || 'No'}
- Current Concerns: ${patientProfile.symptoms || 'No symptoms'}`;

    const inputEstimate = estimateTokens(profileSummary);
    if (inputEstimate > MAX_INPUT_TOKENS) {
      return null;
    }

    const userPrompt = `${profileSummary}

Based on this patient's complete profile, urgency level, and goals, recommend the most appropriate DNA testing category. Explain:
1. Which specific test type would be best suited
2. Why this test is most relevant for their situation
3. What benefits they'll get from this specific test
4. Timeline expectations if relevant
5. Include all mandatory disclaimers`;

    const response = await client.messages.create({
      model: 'claude-opus-4-1',
      max_tokens: MAX_OUTPUT_TOKENS,
      system: TEST_SUGGESTION_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    if (response?.content && response.content.length > 0 && response.content[0].type === 'text') {
      return response.content[0].text;
    }

    return null;
  } catch (error) {
    console.error('Claude test suggestion error:', error.message);
    return null;
  }
};

/**
 * Call Claude for personalized sample collection guidance
 * Provides context-aware guidance for DNA sample collection
 */
export const callClaudeForSampleProcess = async (sampleContext = {}, patientProfile = {}) => {
  try {
    const contextSummary = `
Sample Collection Context:
- Test Type: ${sampleContext.testType || 'Not specified'}
- Sample Preference: ${sampleContext.samplePreference || 'Not sure'}
- Shipping Mode: ${sampleContext.shippingMode || 'Not specified'}
- Fasting Status: ${sampleContext.fastingStatus || 'Not specified'}
- Family Comparison Needed: ${sampleContext.familyMemberRelation || 'No'}

Patient Profile:
- Age: ${patientProfile.age || 'Unknown'}
- Concerns: ${patientProfile.symptoms || 'No specific concerns'}
- Family History: ${patientProfile.familyHistory || 'No'}`;

    const inputEstimate = estimateTokens(contextSummary);
    if (inputEstimate > MAX_INPUT_TOKENS) {
      return null;
    }

    const userPrompt = `${contextSummary}

Provide personalized guidance for this patient's DNA sample collection. Include:
1. Best sample type choice and why for their test
2. Step-by-step collection instructions tailored to their preference
3. Any special precautions needed for their situation
4. Timeline expectations (lab receipt, processing)
5. What to do if they have concerns about the collection method
6. All mandatory disclaimers`;

    const response = await client.messages.create({
      model: 'claude-opus-4-1',
      max_tokens: MAX_OUTPUT_TOKENS,
      system: SAMPLE_PROCESS_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    if (response?.content && response.content.length > 0 && response.content[0].type === 'text') {
      return response.content[0].text;
    }

    return null;
  } catch (error) {
    console.error('Claude sample process error:', error.message);
    return null;
  }
};

/**
 * Call Claude for escalation decision support
 * Assesses urgency and recommends appropriate escalation
 */
export const callClaudeForEscalation = async (patientProfile = {}, escalationContext = {}) => {
  try {
    const profileSummary = `
Patient Profile:
- Age: ${patientProfile.age || 'Unknown'}
- Risk Level: ${escalationContext.riskLevel || 'Unknown'}
- Symptoms: ${escalationContext.symptoms || 'No concerning symptoms'}
- Family History Severity: ${patientProfile.familyHistory || 'No'}
- Known Genetic Disorders: ${patientProfile.knownDisorder || 'None'}
- Currently Consulting Doctor: ${patientProfile.consultedDoctor || 'No'}
- Test Findings: ${escalationContext.testFindings || 'Not yet available'}`;

    const inputEstimate = estimateTokens(profileSummary);
    if (inputEstimate > MAX_INPUT_TOKENS) {
      return null;
    }

    const userPrompt = `${profileSummary}

Based on this patient's profile, assess and recommend:
1. Appropriate level of escalation (monitoring, routine consultation, urgent evaluation)
2. Type of specialist to consider if relevant (genetic counselor, specific medical specialty)
3. Immediate action items for the patient
4. Communication suggestions if family consultation is needed
5. Timeline for follow-up consultation
6. All mandatory disclaimers and emphasis on medical consultation`;

    const response = await client.messages.create({
      model: 'claude-opus-4-1',
      max_tokens: MAX_OUTPUT_TOKENS,
      system: ESCALATION_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    if (response?.content && response.content.length > 0 && response.content[0].type === 'text') {
      return response.content[0].text;
    }

    return null;
  } catch (error) {
    console.error('Claude escalation error:', error.message);
    return null;
  }
};

/**
 * Health check for Claude API
 */
export const checkClaudeConnection = async () => {
  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-1',
      max_tokens: 10,
      messages: [
        {
          role: 'user',
          content: 'Say "OK"',
        },
      ],
    });
    return !!(response?.content && response.content.length > 0);
  } catch (error) {
    console.error('Claude connection check failed:', error.message);
    return false;
  }
};

export default {
  callClaudeForReportSimplification,
  callClaudeForRecommendations,
  callClaudeForGuidance,
  callClaudeForTestSuggestion,
  callClaudeForSampleProcess,
  callClaudeForEscalation,
  checkClaudeConnection,
  estimateTokens,
};
