# 🏗️ Gene-Guard Architecture Guide

**Comprehensive technical documentation for developers.**

---

## 📐 **System Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React Port 3000)              │
├─────────────────────────────────────────────────────────────┤
│  DNAAgentsDashboard                                         │
│  ↓ (apiClient.post() calls)                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Backend API (Express Port 5050)                            │
│  ├── /api/dna/run/:agentId → routes/dnaAgents.js           │
│  ├── /health → routes/health.js                            │
│  └── /api/patients/* → routes/patients.js                  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  Services Layer                                             │
│  ├── geminiService.js → Google Gemini 2.5 Flash           │
│  ├── databaseService.js → MongoDB (localhost:27017)       │
│  └── claudeService.js → Backup (not in use)               │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  Data Persistence (MongoDB)                                │
│  ├── patients (user profiles)                              │
│  ├── dnatests (test records)                               │
│  └── testresults (AI responses)                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 **Agent Execution Flow**

### 1. User Submits Form on Frontend

**File:** `frontend/src/components/DNA/DNAAgentsDashboard.js`

```javascript
const response = await apiClient.runAgent(
  'guidance-agent',
  { age: '32', sex: 'Female', ... },  // formData
  { firstName: 'John', ... }           // patient
);
```

### 2. Request Reaches Backend

**File:** `backend/server.js` (line 71)
```javascript
app.use('/api/dna', dnaAgentsRouter);
```

**File:** `backend/routes/dnaAgents.js` (line 35: `POST /run/:agentId`)
- Validates inputs via `validateFormData()` + `validatePatientData()`
- Checks rate limit via `RateLimiter`
- Evaluates patient via `evaluatePatient()`

### 3. Save to MongoDB (Non-blocking)

**File:** `backend/routes/dnaAgents.js` (lines 99-132)
```javascript
// Save patient + DNA test to MongoDB
const patientRecord = await saveOrUpdatePatient({...});
const testRecord = await saveDNATest(patientId, {...});
```

### 4. Dispatch to Agent Handler

**File:** `backend/routes/dnaAgents.js` (lines 136-152)
```javascript
if (agentId === 'guidance-agent') {
  output = await handleGuidance(formData, patient, evaluation, log);
}
```

### 5. Call Gemini AI (or Fallback)

**File:** `backend/routes/dnaAgents.js` (lines 300-330: `handleGuidance` function)
```javascript
const geminiGuidance = await callGeminiForGuidance({
  age, sex, familyHistory, knownDisorder, symptoms, purpose
});

if (geminiGuidance) {
  filtered = filterClaudeResponse(geminiGuidance);
  return { ...output, aiEnhanced: true };
} else {
  // Fallback to rule-based
  return runAgent('guidance-agent', formData, patient);
}
```

### 6. Save Result to MongoDB

**File:** `backend/routes/dnaAgents.js` (lines 160-195)
```javascript
const testResult = await saveTestResult({
  testId, patientId, agentId, aiResponse, riskLevel, ...
});
```

### 7. Return to Frontend

```json
{
  "success": true,
  "output": {
    "title": "Personalized Pathway Guidance (AI-Enhanced)",
    "summary": "Based on your profile...",
    "highlights": [...],
    "nextSteps": [...]
  },
  "evaluation": { "level": "Moderate", ... },
  "aiEnhanced": true,
  "processingTime": 2341
}
```

---

## 🧠 **The 6 Agents**

### 1. Report Simplifier
- **File:** `handleReportSimplifier` (line 237)
- **Gemini:** `callGeminiForReportSimplification`
- **System Prompt:** `REPORT_SIMPLIFIER_SYSTEM_PROMPT`
- **Input:** Clinical note + gene name + risk level
- **Output:** Explanation structured as:
  - What Was Found
  - What This Means (2-3 bullets)
  - What To Do (1-2 actions)

### 2. Recommendation
- **File:** `handleRecommendation` (line 274)
- **Gemini:** `callGeminiForRecommendations`
- **Input:** Risk level + age + family history + goal
- **Output:** Next steps structured as:
  - Recommended Next Steps
  - Key Actions (3-4 bullets)
  - When To See A Doctor

### 3. Guidance
- **File:** `handleGuidance` (line 300)
- **Gemini:** `callGeminiForGuidance`
- **Input:** Age + sex + family history + symptoms + purpose
- **Output:** Testing pathway recommendation

### 4. Test Suggestion
- **File:** `handleTestSuggestion` (line 327)
- **Gemini:** `callGeminiForTestSuggestion`
- **Input:** Goal + urgency + family history + blood group
- **Output:** Specific test recommendation with rationale

### 5. Sample Process
- **File:** `handleSampleProcess` (line 354)
- **Gemini:** `callGeminiForSampleProcess`
- **Input:** Test type + sample preference + fasting + shipping
- **Output:** Step-by-step collection guidance

### 6. Escalation
- **File:** `handleEscalation` (line 381)
- **Gemini:** `callGeminiForEscalation`
- **Input:** Risk level + symptoms + location + emergency contact
- **Output:** Urgency assessment + alerts (if high-risk)

---

## 🔌 **Key Files & Their Roles**

### Backend Configuration
| File | Purpose | Key Exports |
|------|---------|-------------|
| `config/database.js` | MongoDB connection | `connectDatabase()` |
| `config/systemPrompts.js` | AI system prompts (all 6 agents) | `*_SYSTEM_PROMPT` constants |
| `config/constants.js` | Backend constants | (TBD) |

### Backend Services
| File | Purpose | Key Exports |
|------|---------|-------------|
| `services/geminiService.js` | Google Gemini API wrapper | `callGeminiFor*()` functions |
| `services/databaseService.js` | MongoDB CRUD operations | `saveOrUpdatePatient()`, `saveDNATest()` |
| `services/claudeService.js` | Claude API wrapper (backup) | `callClaudeFor*()` functions |

### Backend Middleware
| File | Purpose | Key Exports |
|------|---------|-------------|
| `middleware/inputValidation.js` | Input validation + XSS prevention | `validateFormData()`, `RateLimiter` |

### Backend Routes
| File | Purpose | Routes |
|------|---------|--------|
| `routes/dnaAgents.js` | All 6 agent endpoints | `POST /run/:agentId` |
| `routes/health.js` | Health & config endpoints | `GET /health`, `GET /api/dna/configs` |
| `routes/patients.js` | Patient endpoints (Phase 4) | (Placeholder) |

### Backend Utils
| File | Purpose | Key Exports |
|------|---------|-------------|
| `utils/logger.js` | Centralized logging | `logger()` function |
| `utils/rateLimiter.js` | Rate limiting | `RateLimiter` class |

### Frontend Services
| File | Purpose | Key Exports |
|------|---------|-------------|
| `src/services/apiClient.js` | Centralized API calls | `apiClient`, `checkBackendHealth()` |

### Frontend Utils
| File | Purpose | Key Exports |
|------|---------|-------------|
| `src/utils/constants.js` | App constants | `AGENT_IDS`, `TEST_TYPES`, etc. |
| `src/utils/formatters.js` | Formatting helpers | `formatDate()`, `capitalize()`, etc. |

---

## 🔐 **Security & Validation**

### Input Validation Pipeline

```
User Input
    ↓
requestValidationMiddleware (header/body checks)
    ↓
validateFormData() (agent-specific fields)
    ↓
validatePatientData() (patient fields, age range, etc.)
    ↓
XSS Check (block script tags)
    ↓
Trimmed & Sanitized
    ↓
Safe to use
```

### Rate Limiting

**File:** `utils/rateLimiter.js`
- Per-session limit: 5000 calls / 24 hours
- Tracks calls by `req.ip`
- Returns 429 if exceeded
- Maps to Gemini free tier limit (60 calls/minute)

### Medical Safety

All system prompts include:
- ✅ Educational context only
- ✅ No diagnosis language
- ✅ No treatment recommendations
- ✅ Mandatory healthcare provider disclaimers
- ✅ Explicit non-medical boundaries

**Response Filtering:** `filterClaudeResponse()` removes:
- Diagnosis language ("you have", "you are")
- Treatment directives ("take medication")
- Medical terminology requiring explanation

---

## 📊 **Database Schema**

### Patient Collection

```javascript
db.patients.insertOne({
  _id: ObjectId("..."),
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  age: 35,
  sex: "Male",
  bloodGroup: "O+",
  familyHistory: "Yes",
  knownDisorder: "None",
  currentSymptoms: "None",
  medications: "Aspirin",
  emergencyContactName: "Jane Doe",
  emergencyContact: "+1234567890",
  location: "New York, NY",
  consultedDoctor: "Yes",
  createdAt: ISODate("2026-04-04T..."),
  updatedAt: ISODate("2026-04-04T...")
})
```

### DNATest Collection

```javascript
db.dnatests.insertOne({
  _id: ObjectId("..."),
  patientId: ObjectId("..."),  // FK to patients
  testType: "Carrier screening",
  samplePreference: "Saliva",
  fastingStatus: "No",
  shippingMode: "Home kit pickup",
  familyMemberRelation: "None",
  purpose: "Family planning",
  urgency: "Routine",
  reportAvailable: false,
  status: "pending",  // or "completed"
  notes: "DNA test initiated for guidance-agent",
  createdAt: ISODate("2026-04-04T...")
})
```

### TestResult Collection

```javascript
db.testresults.insertOne({
  _id: ObjectId("..."),
  testId: ObjectId("..."),         // FK to dnatests
  patientId: ObjectId("..."),      // FK to patients
  agentId: "guidance-agent",
  agentName: "Guidance",
  aiResponse: "Based on your profile...",
  riskLevel: "Moderate",
  nextSteps: ["Consult doctor", "Schedule test"],
  evaluation: {
    riskScore: 45,
    urgencyScore: 30,
    readinessScore: 75,
    inheritanceScore: 50,
    level: "Moderate",
    lane: "Routine follow-up"
  },
  inputData: { age: "35", sex: "Female", ... },
  processingTime: 2341,  // milliseconds
  aiModel: "gemini",     // or "rule-based"
  isReviewed: false,
  createdAt: ISODate("2026-04-04T...")
})
```

---

## 🧪 **Testing**

### Unit Tests

**Location:** `backend/tests/`

```bash
# Test all agents
node tests/test-agents.js

# Test Gemini integration
node tests/test-gemini.js

# Test Claude fallback
node tests/test-claude.js

# Test backend health
node tests/test-backend.js
```

### Manual Testing

**Using curl:**
```bash
curl -X POST http://localhost:5050/api/dna/run/guidance-agent \
  -H "Content-Type: application/json" \
  -d '{
    "formData": {"age": "32", "sex": "Female"},
    "patient": {"age": "32"}
  }'
```

---

## 🚦 **Deployment Checklist**

### Before Production
- [ ] MongoDB Atlas URI configured (not localhost)
- [ ] Gemini API key set to production key
- [ ] REACT_APP_API_URL points to production backend
- [ ] Rate limiting increased for expected traffic
- [ ] HTTPS/SSL enabled
- [ ] CORS properly configured for domain
- [ ] Logging centralized (not just console)
- [ ] Error monitoring set up
- [ ] Database backups automated

---

## 💡 **Common Tasks**

### Add a New Agent

1. Create `handleNewAgent()` function in `routes/dnaAgents.js`
2. Add system prompt to `config/systemPrompts.js`
3. Create Gemini function in `services/geminiService.js`
4. Add to agent dispatch in main router
5. Add to frontend `AGENT_IDS` in `utils/constants.js`

### Modify System Prompt

**File:** `backend/config/systemPrompts.js`

Format guidelines:
- Max 150-180 words
- Include: role, boundaries, output format, disclaimer
- Use markdown headers for structure
- No medical diagnosis language

### Debug Gemini Issues

```javascript
// In geminiService.js, add logging:
console.log('Gemini request:', prompt);
try {
  const result = await model.generateContent(prompt);
  console.log('Gemini response:', result.response.text());
} catch (error) {
  console.error('Gemini error:', error.message);
}
```

---

## 📚 **References**

- **Gemini Docs:** https://ai.google.dev/
- **MongoDB Docs:** https://docs.mongodb.com/
- **Express Docs:** https://expressjs.com/
- **React Docs:** https://react.dev/

---

**Last Updated:** 4 Apr 2026
**Version:** 2.0 (Frontend organized)
**maintainer:** Gene-Guard Team
