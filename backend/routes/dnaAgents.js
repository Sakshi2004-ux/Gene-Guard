/**
 * DNA Agent Routes
 * Handles all 6 AI-enhanced DNA testing agents with Gemini integration
 * and fallback to rule-based logic
 *
 * Agents:
 * 1. Report Simplifier - Explains genetic findings
 * 2. Recommendation - Suggests next steps
 * 3. Guidance - Helps choose testing pathway
 * 4. Test Suggestion - Recommends specific tests
 * 5. Sample Process - Explains collection procedure
 * 6. Escalation - Assesses urgency & alerts
 */

import express from 'express';
import {
  evaluatePatient,
  runAgent,
} from '../../frontend/src/data/dnaAgents.js';
import {
  callGeminiForReportSimplification,
  callGeminiForRecommendations,
  callGeminiForGuidance,
  callGeminiForTestSuggestion,
  callGeminiForSampleProcess,
  callGeminiForEscalation,
} from '../services/geminiService.js';
import {
  saveOrUpdatePatient,
  saveDNATest,
  saveTestResult,
} from '../services/databaseService.js';
import {
  validateReportInput,
  validatePatientData,
  validateFormData,
  filterClaudeResponse,
  RateLimiter,
} from '../middleware/inputValidation.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Rate limiter: 5000 calls per 24h per session (Gemini free tier)
const rateLimiter = new RateLimiter(5000);

/**
 * POST /api/dna/run/:agentId
 * Main agent runner endpoint - dispatches to appropriate agent
 * Saves all inputs/outputs to MongoDB for audit trail
 */
router.post('/run/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params;
    const formData = req.body?.formData || {};
    const patient = req.body?.patient || {};

    logger(`Running agent: ${agentId}`);

    // ====  VALIDATION & RATE LIMITING ====
    const validatedFormData = validateFormData(formData, agentId);
    const validatedPatient = validatePatientData(patient);
    const mergedPatient = { ...validatedPatient, ...validatedFormData };

    const sessionId = req.ip || 'unknown';
    if (!rateLimiter.isAllowed(sessionId)) {
      logger(`Rate limit exceeded for session ${sessionId}`, 'warn');
      return res.status(429).json({ success: false, error: 'Too many requests' });
    }

    // ==== PATIENT EVALUATION ====
    const evaluation = evaluatePatient(mergedPatient);

    // ==== SAVE TO MONGODB ====
    let patientRecord = null;
    let testRecord = null;

    try {
      patientRecord = await saveOrUpdatePatient({
        email: mergedPatient.email || `guest-${Date.now()}@gene-guard.local`,
        firstName: mergedPatient.firstName || 'Patient',
        lastName: mergedPatient.lastName || 'Record',
        age: mergedPatient.age,
        sex: mergedPatient.sex,
        bloodGroup: mergedPatient.bloodGroup,
        familyHistory: mergedPatient.familyHistory,
        knownDisorder: mergedPatient.knownDisorder,
        currentSymptoms: mergedPatient.symptoms,
        medications: mergedPatient.medications,
        emergencyContactName: mergedPatient.emergencyContactName,
        emergencyContact: mergedPatient.emergencyContact,
        location: mergedPatient.location,
        consultedDoctor: mergedPatient.consultedDoctor,
      });

      logger(`Patient record saved: ${patientRecord._id}`);

      testRecord = await saveDNATest(patientRecord._id, {
        testType: validatedFormData.testType || 'General awareness',
        samplePreference: validatedFormData.samplePreference || 'Not sure',
        fastingStatus: validatedFormData.fastingStatus,
        shippingMode: validatedFormData.shippingMode,
        familyMemberRelation: validatedFormData.familyMemberRelation,
        purpose: validatedFormData.purpose,
        urgency: validatedFormData.urgency || 'Routine',
        reportAvailable: validatedFormData.reportAvailable || false,
        status: 'pending',
        notes: `DNA test initiated for ${agentId}`,
      });

      logger(`DNA Test record saved: ${testRecord._id}`);
    } catch (dbError) {
      logger(`Database save error (non-blocking): ${dbError.message}`, 'warn');
    }

    let output;
    let aiMode = false;
    const startTime = Date.now();

    // ==== DISPATCH TO AGENT HANDLER ====
    if (agentId === 'report-simplifier-agent') {
      output = await handleReportSimplifier(validatedFormData, validatedPatient, evaluation, (msg, level) => logger(msg, level));
      aiMode = output.aiEnhanced;
    } else if (agentId === 'recommendation-agent') {
      output = await handleRecommendation(validatedFormData, validatedPatient, evaluation, (msg, level) => logger(msg, level));
      aiMode = output.aiEnhanced;
    } else if (agentId === 'guidance-agent') {
      output = await handleGuidance(validatedFormData, validatedPatient, evaluation, (msg, level) => logger(msg, level));
      aiMode = output.aiEnhanced;
    } else if (agentId === 'test-suggestion-agent') {
      output = await handleTestSuggestion(validatedFormData, validatedPatient, evaluation, (msg, level) => logger(msg, level));
      aiMode = output.aiEnhanced;
    } else if (agentId === 'sample-process-agent') {
      output = await handleSampleProcess(validatedFormData, validatedPatient, evaluation, (msg, level) => logger(msg, level));
      aiMode = output.aiEnhanced;
    } else if (agentId === 'escalation-agent') {
      output = await handleEscalation(validatedFormData, validatedPatient, evaluation, (msg, level) => logger(msg, level));
      aiMode = output.aiEnhanced;
    } else {
      output = runAgent(agentId, validatedFormData, validatedPatient);
      logger(`Using rule-based logic for unknown agent: ${agentId}`);
    }

    // ==== SAVE TEST RESULT TO MONGODB ====
    const processingTime = Date.now() - startTime;

    try {
      if (patientRecord && testRecord) {
        const testResult = await saveTestResult({
          testId: testRecord._id,
          patientId: patientRecord._id,
          agentId: agentId,
          agentName: validatedFormData.agentName || agentId,
          aiResponse: output.summary || '',
          riskLevel: evaluation.level,
          nextSteps: output.nextSteps || [],
          evaluation: {
            riskScore: evaluation.charts?.find((c) => c.label === 'Risk score')?.value || 0,
            urgencyScore: evaluation.charts?.find((c) => c.label === 'Urgency score')?.value || 0,
            readinessScore: evaluation.charts?.find((c) => c.label === 'Testing readiness')?.value || 0,
            inheritanceScore: evaluation.charts?.find((c) => c.label === 'Family inheritance index')?.value || 0,
            level: evaluation.level,
            lane: evaluation.lane,
          },
          inputData: validatedFormData,
          processingTime: processingTime,
          aiModel: aiMode ? 'gemini' : 'rule-based',
          isReviewed: false,
        });

        logger(`Test result saved: ${testResult._id}`);
        output.resultId = testResult._id;
        output.testId = testRecord._id;
        output.patientId = patientRecord._id;
      }
    } catch (dbError) {
      logger(`Error saving test result: ${dbError.message}`, 'warn');
    }

    res.json({
      success: true,
      output,
      evaluation,
      aiEnhanced: aiMode,
      processingTime: processingTime,
    });
  } catch (error) {
    logger(`Agent runner error: ${error.message}`, 'error');
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// AGENT HANDLERS - Each handles one agent's AI logic
// ============================================================================

/**
 * Report Simplifier Agent
 * Analyzes genetic findings and explains them clearly
 */
async function handleReportSimplifier(formData, patient, evaluation, log) {
  const clinicalNote = formData.clinicalNote || '';
  const geneName = formData.geneName || '';

  log(`Report Simplifier: clinicalNote length=${clinicalNote.length}, geneName=${geneName}`);

  if (clinicalNote.trim()) {
    try {
      const validated = validateReportInput(clinicalNote);
      log(`Attempting Gemini for report simplification: ${geneName}`);

      const geminiExplanation = await callGeminiForReportSimplification({
        geneName,
        clinicalNote: validated,
        riskLevel: formData.riskLevel || evaluation.level,
        findingType: formData.findingType || 'Unknown',
      });

      if (geminiExplanation) {
        const filtered = filterClaudeResponse(geminiExplanation);
        log(`Gemini report simplification successful for ${geneName}`);

        return {
          title: 'Simplified Report Output (AI-Enhanced)',
          status: `${evaluation.level} risk`,
          summary: filtered,
          highlights: [
            { label: 'Detected level', value: `${evaluation.level} risk` },
            { label: 'Gene / marker', value: geneName },
            { label: 'Processing', value: 'AI-powered explanation' },
          ],
          nextSteps: [
            'Consult a genetic counselor or doctor with the original report.',
            'Use this explanation to prepare questions for your healthcare provider.',
            'Share this summary with family members if relevant.',
          ],
          aiEnhanced: true,
        };
      }
    } catch (error) {
      log(`Gemini report simplification failed: ${error.message}`, 'warn');
    }
  } else {
    log(`Report Simplifier: clinicalNote is empty after trim`, 'warn');
  }

  // Fallback to rule-based
  const output = runAgent('report-simplifier-agent', formData, patient);
  log('Using rule-based report simplification (fallback)');
  return { ...output, aiEnhanced: false };
}

/**
 * Recommendation Agent
 * Suggests personalized next steps after DNA testing
 */
async function handleRecommendation(formData, patient, evaluation, log) {
  try {
    log('Attempting Gemini for personalized recommendations');

    const geminiRecommendations = await callGeminiForRecommendations({
      riskLevel: formData.riskLevel || evaluation.level,
      age: patient.age || '0',
      familyHistory: patient.familyHistory || 'No',
      consultedDoctor: formData.consultedDoctor || 'No',
      goal: formData.goal || 'Understanding results',
      medications: formData.medications || 'None',
    });

    if (geminiRecommendations) {
      const filtered = filterClaudeResponse(geminiRecommendations);
      log('Gemini recommendations successful');

      return {
        title: 'Recommended Next Steps (AI-Personalized)',
        status: 'Clinical follow-up may be advised',
        summary: filtered,
        highlights: [
          { label: 'Risk level', value: evaluation.level },
          { label: 'Age', value: patient.age || 'Not provided' },
          { label: 'Family history', value: patient.familyHistory || 'No' },
          { label: 'Processing', value: 'AI-powered personalization' },
        ],
        nextSteps: [
          'Discuss these suggestions with your healthcare provider.',
          'Create an action plan based on your personal situation.',
          'Share relevant information with family members as appropriate.',
        ],
        aiEnhanced: true,
      };
    }
  } catch (error) {
    log(`Gemini recommendations failed: ${error.message}`, 'warn');
  }

  // Fallback to rule-based
  const output = runAgent('recommendation-agent', formData, patient);
  log('Using rule-based recommendations (fallback)');
  return { ...output, aiEnhanced: false };
}

/**
 * Guidance Agent
 * Helps patients choose the right DNA testing pathway
 */
async function handleGuidance(formData, patient, evaluation, log) {
  try {
    log('Attempting Gemini for pathway guidance');

    const geminiGuidance = await callGeminiForGuidance({
      age: patient.age || '0',
      sex: patient.sex || 'Not specified',
      familyHistory: patient.familyHistory || 'No',
      knownDisorder: patient.knownDisorder || 'None',
      symptoms: patient.symptoms || 'None',
      purpose: patient.purpose || 'General awareness',
    });

    if (geminiGuidance) {
      const filtered = filterClaudeResponse(geminiGuidance);
      log('Gemini guidance successful');

      return {
        title: 'Personalized Pathway Guidance (AI-Enhanced)',
        status: 'Guidance provided',
        summary: filtered,
        highlights: [
          { label: 'Age', value: patient.age || 'Not provided' },
          { label: 'Purpose', value: patient.purpose || 'Not provided' },
          { label: 'Concerns', value: patient.symptoms || 'None' },
          { label: 'Processing', value: 'AI-powered pathway analysis' },
        ],
        nextSteps: [
          'Review the recommended pathway for your situation.',
          'Consider discussing with your healthcare provider.',
          'Move to the next agent for detailed next steps.',
        ],
        aiEnhanced: true,
      };
    }
  } catch (error) {
    log(`Gemini guidance failed: ${error.message}`, 'warn');
  }

  // Fallback to rule-based
  const output = runAgent('guidance-agent', formData, patient);
  log('Using rule-based guidance (fallback)');
  return { ...output, aiEnhanced: false };
}

/**
 * Test Suggestion Agent
 * Recommends specific DNA tests based on patient profile
 */
async function handleTestSuggestion(formData, patient, evaluation, log) {
  try {
    log('Attempting Gemini for test suggestion');

    const geminiSuggestion = await callGeminiForTestSuggestion({
      goal: formData.goal || 'General awareness',
      urgency: formData.urgency || 'Routine',
      familyHistory: patient.familyHistory || 'No',
      bloodGroup: formData.bloodGroup || 'Unknown',
      reportAvailable: formData.reportAvailable || 'No',
      age: patient.age || '0',
    });

    if (geminiSuggestion) {
      const filtered = filterClaudeResponse(geminiSuggestion);
      log('Gemini test suggestion successful');

      return {
        title: 'Recommended DNA Test (AI-Personalized)',
        status: 'Test recommendation provided',
        summary: filtered,
        highlights: [
          { label: 'Goal', value: formData.goal || 'Not provided' },
          { label: 'Urgency', value: formData.urgency || 'Not provided' },
          { label: 'Family history', value: patient.familyHistory || 'No' },
          { label: 'Processing', value: 'AI-powered recommendation' },
        ],
        nextSteps: [
          'Discuss this test recommendation with your healthcare provider.',
          'Consider your personal readiness and timeline.',
          'Move to Sample Process Agent for collection guidance.',
        ],
        aiEnhanced: true,
      };
    }
  } catch (error) {
    log(`Gemini test suggestion failed: ${error.message}`, 'warn');
  }

  // Fallback to rule-based
  const output = runAgent('test-suggestion-agent', formData, patient);
  log('Using rule-based test suggestion (fallback)');
  return { ...output, aiEnhanced: false };
}

/**
 * Sample Process Agent
 * Provides personalized sample collection guidance
 */
async function handleSampleProcess(formData, patient, evaluation, log) {
  try {
    log('Attempting Gemini for sample collection guidance');

    const geminiSampleGuidance = await callGeminiForSampleProcess({
      testType: formData.testType || 'DNA test',
      samplePreference: formData.samplePreference || 'Not sure',
      shippingMode: formData.shippingMode || 'Not specified',
      fastingStatus: formData.fastingStatus || 'Unknown',
      familyMemberRelation: formData.familyMemberRelation || 'N/A',
    });

    if (geminiSampleGuidance) {
      const filtered = filterClaudeResponse(geminiSampleGuidance);
      log('Gemini sample guidance successful');

      return {
        title: 'Sample Collection Guide (AI-Personalized)',
        status: 'Collection guidance provided',
        summary: filtered,
        highlights: [
          { label: 'Test type', value: formData.testType || 'Not provided' },
          { label: 'Sample preference', value: formData.samplePreference || 'Not provided' },
          { label: 'Shipping mode', value: formData.shippingMode || 'Not provided' },
          { label: 'Processing', value: 'AI-powered guidance' },
        ],
        nextSteps: [
          'Follow all instructions provided with your test kit exactly.',
          'Contact the lab if you have concerns about collection.',
          'Prepare for next steps: Sending sample and awaiting results.',
        ],
        aiEnhanced: true,
      };
    }
  } catch (error) {
    log(`Gemini sample process failed: ${error.message}`, 'warn');
  }

  // Fallback to rule-based
  const output = runAgent('sample-process-agent', formData, patient);
  log('Using rule-based sample process (fallback)');
  return { ...output, aiEnhanced: false };
}

/**
 * Escalation Agent
 * Assesses urgency and alerts if high-risk case detected
 */
async function handleEscalation(formData, patient, evaluation, log) {
  try {
    log('Attempting Gemini for escalation assessment');

    const geminiEscalation = await callGeminiForEscalation({
      riskLevel: formData.riskLevel || evaluation.level,
      location: formData.location || patient.location || 'Not specified',
      symptoms: formData.symptoms || patient.symptoms || 'None',
      emergencyContact: formData.emergencyContact || patient.emergencyContact || 'Not provided',
      emergencyContactName: formData.emergencyContactName || patient.emergencyContactName || 'Contact',
    });

    if (geminiEscalation) {
      const filtered = filterClaudeResponse(geminiEscalation);
      log('Gemini escalation successful');

      return {
        title: 'Escalation Assessment (AI-Enhanced)',
        status: evaluation.level,
        summary: filtered,
        highlights: [
          { label: 'Risk level', value: evaluation.level },
          { label: 'Symptoms', value: formData.symptoms || 'None reported' },
          { label: 'Family history', value: patient.familyHistory || 'No' },
          { label: 'Processing', value: 'AI-powered assessment' },
        ],
        nextSteps: [
          'Review the assessment and recommended escalation level.',
          'Consult with your healthcare provider as suggested.',
          'If experiencing acute symptoms, seek medical attention immediately.',
        ],
        emergency: {
          active: evaluation.level === 'High',
          contact: patient.emergencyContact || '',
          contactName: patient.emergencyContactName || 'Emergency contact',
          location: patient.location || 'Not provided',
          coords: { lat: 19.076, lng: 72.8777 },
          mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(patient.location || 'Mumbai')}`,
          telUrl: `tel:${patient.emergencyContact || ''}`,
          smsUrl: `sms:${patient.emergencyContact || ''}?body=${encodeURIComponent('Escalation alert')}`,
        },
        aiEnhanced: true,
      };
    }
  } catch (error) {
    log(`Gemini escalation failed: ${error.message}`, 'warn');
  }

  // Fallback to rule-based
  const output = runAgent('escalation-agent', formData, patient);
  log('Using rule-based escalation (fallback)');
  return { ...output, aiEnhanced: false };
}

export default router;
