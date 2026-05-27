/**
 * Gemini AI Client for Gene-Guard Frontend
 * Calls Gemini API directly from the browser for each DNA agent.
 * Falls back gracefully if the API is unavailable.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Use the project's existing Gemini key
const GEMINI_API_KEY = 'AIzaSyB6wVKpXpcCUESgUGToMWbsDga1Z_3F7LY';

let genAI = null;
let model = null;

const initClient = () => {
  if (model) return true;
  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    return true;
  } catch (err) {
    console.error('Gemini init failed:', err.message);
    return false;
  }
};

// ─── System Prompts per Agent ─────────────────────────────────────────────────

const SYSTEM_PROMPTS = {
  'guidance-agent': `You are the Gene-Guard User Guidance Agent. Your role is to help a patient decide whether they need DNA testing and which testing pathway suits them best.

Given the patient's age, sex, family history, known disorders, symptoms, and purpose of testing, provide:

**Recommended Testing Pathway:**
Name the best pathway (e.g., carrier screening, health risk screening, hereditary disorder testing, general awareness) and explain in 1-2 sentences why.

**Key Considerations:**
- 3-4 bullet points tailored to their specifics (age, family history impact, symptom relevance)

**What To Do Next:**
1-2 clear action steps to start their journey

Keep it warm, reassuring, and non-technical. 150-200 words max.
Always end with: "This guidance does not replace professional medical advice. Please consult your doctor before proceeding."`,

  'test-suggestion-agent': `You are the Gene-Guard Test Suggestion Agent. Your role is to recommend the most suitable DNA test category based on the patient's goals, urgency, family history, and existing reports.

Given their primary goal, urgency level, blood group, family history, and report status, provide:

**Recommended DNA Test:**
Name the specific test category and 1-2 sentences on why it fits.

**What This Test Reveals:**
- 3 bullet points on what they'll learn from this test
- Tie each point back to their personal situation

**How To Proceed:**
One clear next step

Keep language simple and encouraging. 120-160 words max.
Always include: "Discuss this recommendation with your healthcare provider before proceeding."`,

  'sample-process-agent': `You are the Gene-Guard Sample Process Agent. Your role is to guide patients through DNA sample collection — what type of sample, how to prepare, how to collect, and how to ship.

Given the test type, sample preference, fasting status, shipping mode, and family member relation, provide:

**Your Collection Plan:**
Recommend sample type with a 1-2 sentence reason.

**Before Collection:**
- 2-3 specific preparation tips (food/drink restrictions, timing, what to bring)

**Collection Steps:**
- 3-4 numbered steps specific to their sample type (saliva vs blood)
- Include reassurance if it's blood-based

**After Collection:**
- Packaging, shipping, and timeline based on their submission mode

Keep it friendly, practical, and reassuring. 150-180 words max.
Always include: "Follow kit instructions exactly. Contact the lab with any questions."`,

  'report-simplifier-agent': `You are the Gene-Guard Report Simplifier Agent. Your role is to translate complex genetic test findings into plain language that any patient can understand.

Given the risk level, finding type, gene/marker name, and clinical note, provide:

**What Was Found:**
One clear sentence explaining the main finding in everyday language.

**What This Means For You:**
- 3 bullet points explaining:
  - What this gene/marker does in the body
  - What having this finding means for their health
  - Whether action is needed or it's just something to monitor

**What To Do:**
1-2 practical next steps (e.g., discuss with doctor, share with family)

Avoid medical jargon. Use analogies if helpful. 150-200 words max.
Always include: "This is an educational summary, not a diagnosis. Please discuss your results with your doctor."`,

  'recommendation-agent': `You are the Gene-Guard Recommendation Agent. Your role is to suggest practical, personalized next steps after DNA test results are available.

Given the risk level, doctor consultation status, family history, patient goal, and current medications, provide:

**Recommended Next Steps:**
1-2 opening sentences on what's most important right now.

**Key Actions:**
- 4 specific, actionable items they should do
- Include lifestyle adjustments, specialist referrals, screening schedules, or family communication as relevant

**When To See a Doctor:**
Clear timeline and type of specialist if needed.

Keep it empathetic, practical, and empowering. 130-180 words max.
Always include: "These are suggestions for awareness. Consult your healthcare provider for a personalized plan."`,

  'escalation-agent': `You are the Gene-Guard Escalation Agent. Your role is to assess how urgently a patient needs follow-up based on their risk profile, symptoms, and support situation.

Given the risk level, location, emergency contact details, and symptom severity, provide:

**Follow-Up Priority:**
State the urgency tier: Routine / Soon (2-4 weeks) / Urgent (within 1 week) / Emergency

**Why This Priority:**
2-3 sentences explaining what in their profile drives this urgency level.

**Recommended Actions:**
- 3 bullet points with specific next steps
- Include specialist type if relevant
- Include what to tell their doctor

**Emergency Note:**
If high-risk or severe symptoms: "If you are experiencing acute symptoms, please call emergency services or go to the nearest hospital immediately."

Keep it calm but clear. 120-160 words max.
Always include: "This assessment is for guidance. Your doctor will determine the best course of action."`,
};

// ─── Build User Context String ────────────────────────────────────────────────

const buildUserContext = (agentId, formData, patient) => {
  const safe = (key) => (formData[key] ?? patient[key] ?? '').toString().trim() || 'Not provided';

  switch (agentId) {
    case 'guidance-agent':
      return `Patient Details:
- Age: ${safe('age')}
- Sex: ${safe('sex')}
- Family history of genetic disorder: ${safe('familyHistory')}
- Known disorder in family: ${safe('knownDisorder')}
- Current concern / symptom level: ${safe('symptoms')}
- Purpose of test: ${safe('purpose')}
- Patient name: ${safe('fullName')}`;

    case 'test-suggestion-agent':
      return `Patient Context:
- Primary goal: ${safe('goal')}
- Urgency: ${safe('urgency')}
- Family history: ${safe('familyHistory')}
- Blood group: ${safe('bloodGroup')}
- Has existing report: ${safe('reportAvailable')}
- Age: ${safe('age')}
- Patient name: ${safe('fullName')}`;

    case 'sample-process-agent':
      return `Test & Collection Details:
- Selected test type: ${safe('testType')}
- Preferred sample type: ${safe('samplePreference')}
- Followed food restriction: ${safe('fastingStatus')}
- Sample submission mode: ${safe('shippingMode')}
- Family member for comparative test: ${safe('familyMemberRelation')}
- Patient name: ${safe('fullName')}`;

    case 'report-simplifier-agent':
      return `Report Details:
- Observed risk level: ${safe('riskLevel')}
- Main finding type: ${safe('findingType')}
- Gene / marker name: ${safe('geneName')}
- Short note from report: ${safe('clinicalNote')}
- Patient name: ${safe('fullName')}`;

    case 'recommendation-agent':
      return `Patient Profile:
- Current risk level: ${safe('riskLevel')}
- Already consulted a doctor: ${safe('consultedDoctor')}
- Family history present: ${safe('familyHistory')}
- What they want help with: ${safe('goal')}
- Current medications: ${safe('medications')}
- Age: ${safe('age')}
- Patient name: ${safe('fullName')}`;

    case 'escalation-agent':
      return `Risk Assessment:
- Current risk level: ${safe('riskLevel')}
- Current city / area: ${safe('location')}
- Emergency contact: ${safe('emergencyContactName')} (${safe('emergencyContact')})
- Urgency symptoms: ${safe('symptoms')}
- Family history: ${safe('familyHistory')}
- Age: ${safe('age')}
- Patient name: ${safe('fullName')}`;

    default:
      return `Patient data: ${JSON.stringify({ ...patient, ...formData })}`;
  }
};

// ─── Parse AI Response into Structured Output ─────────────────────────────────

const parseAIResponse = (text, agentId, formData, patient) => {
  // Clean markdown artifacts
  const cleaned = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\*\*\*/g, '')
    .trim();

  // Extract sections by bold headers
  const lines = cleaned.split('\n');
  const highlights = [];
  const nextSteps = [];
  let summaryParts = [];
  let inNextSteps = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Detect "next steps" / "what to do" sections
    if (/^\*\*(what to do|next step|recommended action|how to proceed|when to see|key action|emergency)/i.test(trimmed)) {
      inNextSteps = true;
      continue;
    }

    // Detect header lines for highlights
    if (/^\*\*.+:\*\*/.test(trimmed)) {
      const match = trimmed.match(/^\*\*(.+?):\*\*\s*(.*)/);
      if (match) {
        const label = match[1].trim();
        const value = match[2].trim();
        if (value && !inNextSteps) {
          highlights.push({ label, value });
        } else if (!value) {
          // Section header without inline value
          inNextSteps = /next|action|do|proceed|see|emergency/i.test(label);
        }
      }
      continue;
    }

    // Bullet points
    if (/^[-•*]\s/.test(trimmed) || /^\d+[.)]\s/.test(trimmed)) {
      const content = trimmed.replace(/^[-•*\d.)]+\s*/, '').trim();
      if (content) {
        if (inNextSteps) {
          nextSteps.push(content);
        } else {
          summaryParts.push(content);
        }
      }
      continue;
    }

    // Regular text
    summaryParts.push(trimmed);
  }

  // Build summary — use the full cleaned text for better readability
  const summary = cleaned;

  // If we didn't extract structured highlights, create from form data
  if (highlights.length === 0) {
    const safe = (key) => (formData[key] ?? patient[key] ?? '').toString().trim() || 'Not provided';
    switch (agentId) {
      case 'guidance-agent':
        highlights.push(
          { label: 'Family history', value: safe('familyHistory') },
          { label: 'Concern level', value: safe('symptoms') },
          { label: 'Purpose', value: safe('purpose') },
          { label: 'Processing', value: 'AI-powered analysis' },
        );
        break;
      case 'test-suggestion-agent':
        highlights.push(
          { label: 'Primary goal', value: safe('goal') },
          { label: 'Urgency', value: safe('urgency') },
          { label: 'Blood group', value: safe('bloodGroup') },
          { label: 'Processing', value: 'AI-powered recommendation' },
        );
        break;
      case 'sample-process-agent':
        highlights.push(
          { label: 'Test type', value: safe('testType') },
          { label: 'Sample preference', value: safe('samplePreference') },
          { label: 'Submission mode', value: safe('shippingMode') },
          { label: 'Processing', value: 'AI-powered guidance' },
        );
        break;
      case 'report-simplifier-agent':
        highlights.push(
          { label: 'Risk level', value: safe('riskLevel') },
          { label: 'Finding type', value: safe('findingType') },
          { label: 'Gene / marker', value: safe('geneName') },
          { label: 'Processing', value: 'AI-powered explanation' },
        );
        break;
      case 'recommendation-agent':
        highlights.push(
          { label: 'Risk level', value: safe('riskLevel') },
          { label: 'Doctor consulted', value: safe('consultedDoctor') },
          { label: 'Goal', value: safe('goal') },
          { label: 'Processing', value: 'AI-powered personalization' },
        );
        break;
      case 'escalation-agent':
        highlights.push(
          { label: 'Location', value: safe('location') },
          { label: 'Symptoms', value: safe('symptoms') },
          { label: 'Emergency contact', value: `${safe('emergencyContactName')} · ${safe('emergencyContact')}` },
          { label: 'Processing', value: 'AI-powered assessment' },
        );
        break;
      default:
        highlights.push({ label: 'Processing', value: 'AI-powered' });
    }
  }

  // Ensure we have next steps
  if (nextSteps.length === 0) {
    nextSteps.push(
      'Review this assessment carefully with your healthcare provider.',
      'Keep this summary for reference during your next doctor visit.',
      'Share relevant findings with family members if appropriate.',
    );
  }

  return { summary, highlights: highlights.slice(0, 4), nextSteps: nextSteps.slice(0, 4) };
};

// ─── Agent Title Map ──────────────────────────────────────────────────────────

const AGENT_TITLES = {
  'guidance-agent': 'Personalized Pathway Guidance',
  'test-suggestion-agent': 'Recommended DNA Test',
  'sample-process-agent': 'Sample Collection Guide',
  'report-simplifier-agent': 'Simplified Report Explanation',
  'recommendation-agent': 'Recommended Next Steps',
  'escalation-agent': 'Escalation Assessment',
};

// ─── Main Export: Call Gemini for a specific agent ────────────────────────────

export const callGeminiAgent = async (agentId, formData = {}, patient = {}) => {
  if (!initClient()) {
    throw new Error('Could not initialize Gemini client');
  }

  const systemPrompt = SYSTEM_PROMPTS[agentId];
  if (!systemPrompt) {
    throw new Error(`No system prompt for agent: ${agentId}`);
  }

  const userContext = buildUserContext(agentId, formData, patient);

  const fullPrompt = `${systemPrompt}\n\n---\n\n${userContext}\n\nPlease provide your analysis now.`;

  try {
    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();

    if (!responseText || responseText.trim().length < 20) {
      throw new Error('Empty or too-short response from Gemini');
    }

    const parsed = parseAIResponse(responseText, agentId, formData, patient);

    return {
      title: `${AGENT_TITLES[agentId] || 'Agent Output'} (AI-Enhanced)`,
      status: 'AI analysis complete',
      summary: parsed.summary,
      highlights: parsed.highlights,
      nextSteps: parsed.nextSteps,
      aiEnhanced: true,
    };
  } catch (err) {
    console.error(`Gemini call failed for ${agentId}:`, err.message);
    throw err;
  }
};
