import { GoogleGenerativeAI } from '@google/generative-ai';
import { REPORT_SIMPLIFIER_SYSTEM_PROMPT, RECOMMENDATION_SYSTEM_PROMPT, GUIDANCE_SYSTEM_PROMPT, TEST_SUGGESTION_SYSTEM_PROMPT, SAMPLE_PROCESS_SYSTEM_PROMPT, ESCALATION_SYSTEM_PROMPT } from '../config/systemPrompts.js';

let genAI = null;
let model = null;

export const initGeminiClient = (apiKey) => {
  if (!apiKey) {
    console.warn('⚠️ GEMINI_API_KEY not found in environment. Gemini will be unavailable.');
    return false;
  }
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    console.log('✓ Gemini client initialized with gemini-2.5-flash');
    return true;
  } catch (error) {
    console.error('✗ Failed to initialize Gemini:', error.message);
    return false;
  }
};

export const checkGeminiConnection = async () => {
  if (!model) {
    console.warn('Gemini model not initialized');
    return { connected: false, error: 'Gemini not initialized' };
  }
  try {
    const result = await model.generateContent('Say "OK"');
    return { connected: true, model: 'gemini-pro' };
  } catch (error) {
    console.error('Gemini connection check failed:', error.message);
    return { connected: false, error: error.message };
  }
};

const cleanResponse = (text) => {
  // Remove markdown code blocks if present
  const cleaned = text.replace(/```[\s\S]*?```/g, '').trim();
  return cleaned;
};

export const callGeminiForReportSimplification = async (geneData) => {
  if (!model) throw new Error('Gemini not initialized');

  const prompt = `${REPORT_SIMPLIFIER_SYSTEM_PROMPT}

Gene/Marker: ${geneData.geneName || 'Unknown'}
Finding Type: ${geneData.findingType || 'Unknown'}
Risk Level: ${geneData.riskLevel || 'Unknown'}
Clinical Note: ${geneData.clinicalNote || 'No note provided'}

Provide a patient-friendly explanation of these findings.`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return cleanResponse(responseText);
  } catch (error) {
    console.error('Gemini report simplification error:', error.message);
    throw error;
  }
};

export const callGeminiForRecommendations = async (patientData) => {
  if (!model) throw new Error('Gemini not initialized');

  const prompt = `${RECOMMENDATION_SYSTEM_PROMPT}

Patient Profile:
- Risk Level: ${patientData.riskLevel || 'Unknown'}
- Age: ${patientData.age || 'Unknown'}
- Family History: ${patientData.familyHistory || 'Unknown'}
- Consulted Doctor: ${patientData.consultedDoctor || 'Unknown'}
- Goal: ${patientData.goal || 'Unknown'}
- Current Medications: ${patientData.medications || 'None'}

Based on this profile, provide personalized next-step recommendations.`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return cleanResponse(responseText);
  } catch (error) {
    console.error('Gemini recommendations error:', error.message);
    throw error;
  }
};

export const callGeminiForGuidance = async (patientData) => {
  if (!model) throw new Error('Gemini not initialized');

  const prompt = `${GUIDANCE_SYSTEM_PROMPT}

Patient Information:
- Age: ${patientData.age || 'Unknown'}
- Sex: ${patientData.sex || 'Unknown'}
- Family History: ${patientData.familyHistory || 'No'}
- Known Disorder: ${patientData.knownDisorder || 'None'}
- Current Symptoms: ${patientData.symptoms || 'None'}
- Purpose of Test: ${patientData.purpose || 'Unknown'}

Ask clarifying questions if needed, or provide the most suitable DNA testing pathway recommendation.`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return cleanResponse(responseText);
  } catch (error) {
    console.error('Gemini guidance error:', error.message);
    throw error;
  }
};

export const callGeminiForTestSuggestion = async (patientData) => {
  if (!model) throw new Error('Gemini not initialized');

  const prompt = `${TEST_SUGGESTION_SYSTEM_PROMPT}

Patient Context:
- Goal: ${patientData.goal || 'Unknown'}
- Urgency: ${patientData.urgency || 'Routine'}
- Family History: ${patientData.familyHistory || 'No'}
- Blood Group: ${patientData.bloodGroup || 'Unknown'}
- Has Report: ${patientData.reportAvailable || 'No'}
- Age: ${patientData.age || 'Unknown'}

Recommend the most suitable DNA test category with explanation.`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return cleanResponse(responseText);
  } catch (error) {
    console.error('Gemini test suggestion error:', error.message);
    throw error;
  }
};

export const callGeminiForSampleProcess = async (testData) => {
  if (!model) throw new Error('Gemini not initialized');

  const prompt = `${SAMPLE_PROCESS_SYSTEM_PROMPT}

Test Information:
- Test Type: ${testData.testType || 'Unknown'}
- Sample Preference: ${testData.samplePreference || 'Not sure'}
- Fasting Status: ${testData.fastingStatus || 'Unknown'}
- Shipping Mode: ${testData.shippingMode || 'Unknown'}
- Family Member Relation: ${testData.familyMemberRelation || 'N/A'}

Provide personalized sample collection guidance and precautions.`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return cleanResponse(responseText);
  } catch (error) {
    console.error('Gemini sample process error:', error.message);
    throw error;
  }
};

export const callGeminiForEscalation = async (riskData) => {
  if (!model) throw new Error('Gemini not initialized');

  const prompt = `${ESCALATION_SYSTEM_PROMPT}

Risk Assessment:
- Risk Level: ${riskData.riskLevel || 'Unknown'}
- Location: ${riskData.location || 'Unknown'}
- Symptoms: ${riskData.symptoms || 'Unknown'}
- Emergency Contact: ${riskData.emergencyContact || 'Not provided'}
- Emergency Contact Name: ${riskData.emergencyContactName || 'Not provided'}

Assess appropriate escalation level and recommended actions.`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return cleanResponse(responseText);
  } catch (error) {
    console.error('Gemini escalation error:', error.message);
    throw error;
  }
};
