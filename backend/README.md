# Gene-Guard Backend with Claude AI Integration

## Overview

This backend adds **Claude AI-powered gene report simplification and personalized recommendations** to the Gene-Guard DNA testing platform, while maintaining graceful fallback to rule-based logic when the API is unavailable.

### Key Features

✅ **AI-Enhanced Report Simplification** — Parse actual genetic report text with Claude
✅ **Personalized Recommendations** — Generate next steps based on full patient context
✅ **Medical Safety Guardrails** — System prompts with disclaimers, input validation, response filtering
✅ **Graceful Fallback** — Works offline using rule-based agents
✅ **Rate Limiting** — 50 API calls per 24h per session to manage costs
✅ **Zero Frontend Changes** — Works seamlessly with existing React dashboard

---

## Setup Instructions

### 1. Prerequisites

- **Node.js 18+** installed
- **npm** package manager
- **Anthropic API Key** from [console.anthropic.com](https://console.anthropic.com/account/keys)

### 2. Configure API Key

The backend needs your Anthropic API key. Add it to the `.env` file:

```bash
cd backend

# Either:
# Option A: Copy from template and edit
cp .env.example .env
# Then edit .env and replace with your actual key

# Or:
# Option B: Set directly (Linux/Mac)
export ANTHROPIC_API_KEY="sk-ant-your-key-here"
export NODE_ENV="development"
export PORT="5000"
```

### 3. Install & Start Backend

```bash
cd backend

# Install dependencies (if not already done)
npm install

# Start the server
npm start

# You should see:
# ✓ Server listening on http://localhost:5000
# ✓ Claude API connection successful
# Available endpoints: ...
```

### 4. Start the Frontend (in a new terminal)

```bash
cd Gene-Guard-main

npm install  # if needed
npm start

# Frontend opens at http://localhost:3000
```

### 5. Test the System

1. Navigate to **http://localhost:3000/dna/agents**
2. Go to **Report Simplifier Agent** (🧪 tab)
3. Fill in:
   - **Gene/marker name**: `BRCA1`
   - **Short note from report**: `Heterozygous c.68_69delAG pathogenic variant`
4. Click **Run agent**
5. You should see Claude's AI-powered explanation with medical disclaimers

---

## How It Works

### Architecture

```
React Frontend (port 3000)
    ↓
    Calls: http://localhost:5000/api/dna/run/:agentId
    ↓
Express Backend (port 5000)
    ↓
[Try] Claude API with safety guardrails
    ↓ (on error)
[Fallback] Local rule-based logic
    ↓
Returns enriched response to frontend
```

### File Structure

```
backend/
├── server.js                        # Express app + routing
├── config/systemPrompts.js          # Medical safety guardrails
├── middleware/inputValidation.js    # Input sanitization
├── services/claudeService.js        # Claude SDK wrapper
├── test-backend.js                  # Quick validation test
├── package.json                     #Dependencies
└── .env                             # API key (keep secret!)
```

### API Endpoints

#### `GET /health`
Health check endpoint.
```bash
curl http://localhost:5000/health
# {"status":"ok","service":"gene-guard-backend"}
```

#### `GET /api/dna/configs`
Fetch all agent configurations.
```bash
curl http://localhost:5000/api/dna/configs
```

#### `POST /api/dna/patient/evaluate`
Evaluate patient data and calculate risk scores.
```bash
curl -X POST http://localhost:5000/api/dna/patient/evaluate \
  -H "Content-Type: application/json" \
  -d '{"patient":{"age":"45","familyHistory":"Yes"}}'
```

#### `POST /api/dna/run/:agentId`
**Primary endpoint** — Run any agent with AI enhancement where applicable.

```bash
curl -X POST http://localhost:5000/api/dna/run/report-simplifier-agent \
  -H "Content-Type: application/json" \
  -d '{
    "formData": {
      "geneName": "BRCA1",
      "clinicalNote": "Heterozygous c.68_69delAG pathogenic variant",
      "riskLevel": "High"
    },
    "patient": {
      "age": "45",
      "familyHistory": "Yes",
      "symptoms": "Severe"
    }
  }'
```

**Response includes:**
- `output` — Agent result with Claude enhancement or fallback
- `evaluation` — Patient risk assessment
- `aiEnhanced` — Boolean indicating if Claude was used

---

## Safety & Medical Guidelines

### System Prompts

Each Claude call includes:
1. **Role definition** — "You are a genetic testing guidance assistant for **patient education only**"
2. **Scope limits** — "You are NOT providing medical diagnosis or treatment"
3. **Mandatory disclaimers** — Every response includes:
   - "This is educational content, not a medical diagnosis"
   - "Please consult a genetic counselor or healthcare provider"
   - "Results should always be reviewed with a qualified healthcare professional"

### Input Validation

- Report text: Max 4,000 characters (~1,000 tokens)
- Patient fields: Whitelist validation (age range, blood group format)
- XSS/SQL injection prevention: Blocked

### Response Filtering

Before returning Claude's response:
- ❌ Block diagnosis language ("you have this disease")
- ❌ Block treatment prescriptions ("take this medication")
- ❌ Block prognosis claims
- ✅ Ensure disclaimers present
- ✅ Truncate if too long

### Rate Limiting

- **50 API calls per 24 hours** per user session
- Cost management: ~$0.003-0.01 per call → $3-10/day for 100 calls

---

## Troubleshooting

### Problem: "Cannot find module '@anthropic-ai/sdk'"
**Solution:** Run `npm install` in the `backend/` directory

### Problem: "ANTHROPIC_API_KEY is not set"
**Solution:**
1. Go to https://console.anthropic.com/account/keys
2. Create or copy your API key
3. Add to `backend/.env`: `ANTHROPIC_API_KEY=sk-ant-...`
4. Restart backend with `npm start`

### Problem: "Port 5000 already in use"
**Solution:**
```bash
# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Windows (PowerShell)
netstat -ano | findstr :5000 | % { $_.split()[4] } | % { taskkill /PID $_ /F }

# Or use a different port:
PORT=5001 npm start
```

### Problem: Claude returns "This explanation is for educational purposes only" repeatedly
**This is correct behavior!** The system is working as designed. Disclaimers are mandatory medical safety guardrails.

### Problem: Fallback to rule-based logic, but I have API key set
**Check:**
1. API key format: Must start with `sk-ant-`
2. API key is valid on https://console.anthropic.com
3. Check backend logs for error details
4. Verify `.env` file is in `backend/` directory

---

## Testing

### Quick Validation
```bash
cd backend
node test-backend.js
```

Output should show:
- ✓ Import test passed
- ✓ Patient evaluation test passed
- ✓ Report input validation passed
- ✓ Patient data validation passed
- ✓ Response filtering passed
- ✓ Agent execution test passed

### Manual Testing

Use the frontend dashboard:
1. **Report Simplifier Agent** — Test with real gene names and clinical findings
2. **Recommendation Agent** — Fill patient profile and test personalized guidance
3. **Stop backend** (`Ctrl+C`) — App should still work with rule-based logic
4. **Enable dark mode** — Test UI in both light/dark themes

## Environment Variables

### Required
- `ANTHROPIC_API_KEY` — Your Anthropic API key

### Optional
- `PORT` — Server port (default: 5000)
- `NODE_ENV` — "development" or "production" (default: development)

## Next Steps

### Phase 2: Recommendation Agent Enhancement (Coming Soon)
- Personalized next steps based on full patient context
- Medication considerations
- Specialist recommendations

### Phase 3: Conversational Guidance (Optional)
- Multi-turn chat for pathway selection
- Better UX for initial intake

### Phase 4: Advanced Safety (Optional)
- Audit logging for compliance
- Cost tracking dashboard
- Response quality monitoring

---

## Support

For issues or questions:
- Check the **Troubleshooting** section above
- Review backend logs (start server with `npm start`)
- Validate structure with `node test-backend.js`

---

## Medical Disclaimer

This tool provides **educational guidance only** and is not a substitute for professional medical advice. Always consult with a genetic counselor, doctor, or other qualified healthcare provider before making health decisions based on genetic testing results.

**Gene-Guard is not:**
- A diagnostic tool
- A replacement for professional medical consultation
- Providing medical treatment recommendations
- A source of final clinical decisions

---

## Cost Estimation

| Scenario | Calls/Day | Cost/Day | Cost/Month |
|----------|-----------|----------|-----------|
| Light usage (10 calls)    | 10        | $0.03-0.10   | $0.90-3.00    |
| Medium usage (50 calls)   | 50        | $0.15-0.50   | $4.50-15.00   |
| Heavy usage (100 calls)   | 100       | $0.30-1.00   | $9.00-30.00   |

*Costs are estimates based on `claude-opus-4-1` model (~$0.003-0.01 per call)*

---

## License

Same as Gene-Guard main project.
