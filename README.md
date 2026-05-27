# 🧬 Gene-Guard: AI-Powered DNA Testing Platform

A comprehensive, AI-enhanced platform for DNA testing guidance using **Gemini AI** and **MongoDB**. Helps patients understand genetic findings, choose appropriate tests, and receive personalized guidance through 6 intelligent agents.

---

## 🚀 **Quick Start**

### Prerequisites
- **Node.js** v20+
- **MongoDB** running locally (`mongodb://localhost:27017`)
- **Gemini API Key** from [Google Cloud Console](https://console.cloud.google.com/)

### Setup

**1. Clone and install dependencies:**
```bash
# Backend
cd Gene-Guard-agents-v3/backend
npm install

# Frontend
cd ../Gene-Guard-main  # or 'frontend' after rename
npm install
```

**2. Set environment variables:**

**Backend** (`.env`):
```env
MONGODB_URI=mongodb://localhost:27017/gene-guard
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5050
NODE_ENV=development
```

**Frontend** (`.env.local`):
```env
REACT_APP_API_URL=http://localhost:5050/api
```

**3. Start services:**
```bash
# Terminal 1: Backend (port 5050)
cd backend && npm start

# Terminal 2: Frontend (port 3000)
cd frontend && npm start
```

**4. Open browser:**
```
http://localhost:3000
```

---

## 🧠 **The 6 DNA Agents**

Each agent uses **Gemini AI** with fallback to intelligent rule-based logic:

| Agent | Purpose | Input | Output |
|-------|---------|-------|--------|
| **Report Simplifier** | Explains genetic findings | Clinical report + gene name | Plain-language explanation |
| **Recommendation** | Suggests next steps | Risk level + patient profile | Personalized action plan |
| **Guidance** | Helps choose testing pathway | Age, symptoms, family history | Recommended testing path |
| **Test Suggestion** | Recommends specific tests | Goals + urgency + history | Best test + rationale |
| **Sample Process** | Guides collection | Test type + preferences | Step-by-step collection guide |
| **Escalation** | Assesses urgency | Risk level + symptoms | Follow-up timeline + alerts |

---

## 📁 **Project Structure**

```
Gene-Guard-agents-v3/
│
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── systemPrompts.js     # AI agent prompts
│   ├── models/                  # MongoDB schemas
│   │   ├── Patient.js
│   │   ├── DNATest.js
│   │   └── TestResult.js
│   ├── services/
│   │   ├── geminiService.js     # Google Gemini integration
│   │   ├── claudeService.js     # Claude backup
│   │   └── databaseService.js   # MongoDB CRUD
│   ├── middleware/
│   │   └── inputValidation.js   # Input validation + XSS prevention
│   ├── routes/
│   │   ├── dnaAgents.js         # All 6 agent endpoints
│   │   ├── health.js            # Health check endpoints
│   │   └── patients.js          # Patient routes (Phase 4)
│   ├── utils/
│   │   ├── logger.js            # Logging utility
│   │   └── rateLimiter.js       # Rate limiting
│   ├── tests/
│   │   ├── test-agents.js       # Test all agents
│   │   ├── test-gemini.js       # Test Gemini
│   │   └── test-claude.js       # Test Claude
│   ├── server.js                # Main Express app (217 lines)
│   └── package.json
│
├── frontend/  (formerly Gene-Guard-main)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/            # Login, Register
│   │   │   ├── DNA/             # Agent dashboard, intake
│   │   │   ├── Pages/           # Home, About, Learn, etc.
│   │   │   ├── Layout/          # Header, Footer (future)
│   │   │   └── Images/          # Profile images
│   │   ├── services/
│   │   │   └── apiClient.js     # Centralized API calls
│   │   ├── hooks/               # Custom React hooks (Phase 4)
│   │   ├── utils/
│   │   │   ├── constants.js     # App constants + agent IDs
│   │   │   └── formatters.js    # Date, text formatting helpers
│   │   ├── data/
│   │   │   └── dnaAgents.js     # Agent configurations
│   │   ├── App.js               # Main routing
│   │   └── index.js
│   └── package.json
│
├── ARCHITECTURE.md              # Detailed technical docs
├── README.md                    # This file
└── .gitignore

```

---

## 📊 **Data Flow**

```
User Form (React)
      ↓
API Request to Backend
      ↓
Validation & Rate Limiting
      ↓
Save to MongoDB (Patient, DNATest)
      ↓
Call Gemini AI Agent
      ↓
(If Gemini fails → Fallback to rule-based)
      ↓
Save Result to MongoDB
      ↓
Return JSON to Frontend
      ↓
Display Results
```

---

## 🔌 **API Endpoints**

### Health & Config
- `GET /health` - Service health check
- `GET /api/dna/configs` - All agent configurations

### Agent Execution
- `POST /api/dna/run/:agentId` - Run specific agent
  - Path: `:agentId` = `report-simplifier-agent`, `recommendation-agent`, etc.
  - Body: `{formData: {...}, patient: {...}}`

### Patient
- `POST /api/dna/patient/evaluate` - Evaluate patient profile
- `POST /api/dna/simplify-report-ai` - Direct report simplification

---

## 💾 **Database Collections**

### Patients
```javascript
{
  _id: ObjectId,
  email: String,
  firstName: String,
  lastName: String,
  age: Number,
  sex: String,
  bloodGroup: String,
  familyHistory: String,
  knownDisorder: String,
  currentSymptoms: String,
  emergencyContact: String,
  location: String,
  createdAt: Date,
  updatedAt: Date
}
```

### DNATests
```javascript
{
  _id: ObjectId,
  patientId: ObjectId,
  testType: String,
  samplePreference: String,
  urgency: String,
  status: String,  // pending, completed
  createdAt: Date
}
```

### TestResults
```javascript
{
  _id: ObjectId,
  testId: ObjectId,
  patientId: ObjectId,
  agentId: String,
  aiResponse: String,
  riskLevel: String,
  aiModel: String,  // "gemini" or "rule-based"
  processingTime: Number,
  createdAt: Date
}
```

---

## 🛡️ **Security Features**

- ✅ Input validation & sanitization
- ✅ XSS prevention
- ✅ Rate limiting (5000 calls/24h per session)
- ✅ Medical safety guardrails in AI prompts
- ✅ No diagnosis language in outputs
- ✅ All inputs logged for audit trail

---

## 📈 **Roadmap**

- **Phase 1** ✅ MongoDB + Gemini integration
- **Phase 2** ✅ Frontend reorganization
- **Phase 3** 🔄 Documentation (WIP)
- **Phase 4** 📅 Patient authentication & history
- **Phase 5** 📅 Advanced analytics dashboard
- **Phase 6** 📅 Mobile app

---

## 🔧 **Tech Stack**

### Backend
- **Express.js** - Web framework
- **MongoDB** + **Mongoose** - Database
- **Google Gemini 2.5 Flash** - AI engine
- **Node.js** - Runtime

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Axios** (via apiClient) - HTTP client
- **CSS** - Styling

---

## 📝 **License**

Gene-Guard is open source under the MIT License.

---

## ❓ **FAQ**

**Q: What if Gemini API fails?**
A: Automatic fallback to intelligent rule-based logic. Users won't notice interruption.

**Q: Is this medical diagnosis?**
A: No. All outputs include disclaimers: "This is educational guidance only. Consult a healthcare provider."

**Q: How much does Gemini cost?**
A: ~$0 (free tier). 60 calls/minute limit. Perfect for development/testing.

**Q: Can I use this offline?**
A: Yes, mostly. MongoDB can be local. Gemini requires internet, but rule-based fallback works offline.

---

## 💬 **Support**

For issues, questions, or suggestions:
- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- Review backend logs: `npm start`
- Test agents directly: `node backend/tests/test-agents.js`

---

**Built with ❤️ for genetic literacy and patient empowerment.**
