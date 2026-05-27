/**
 * Gene-Guard Backend Server
 * Express app with Gemini AI integration and MongoDB persistence
 *
 * Architecture:
 * - Routes located in /routes/ (dnaAgents.js, patients.js, health.js)
 * - Services in /services/ (geminiService.js, databaseService.js)
 * - Middleware in /middleware/ (inputValidation.js)
 * - Utils in /utils/ (logger.js, rateLimiter.js)
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Route imports
import dnaAgentsRouter from './routes/dnaAgents.js';
import healthRouter from './routes/health.js';
import patientsRouter from './routes/patients.js';

// Service imports
import {
  initGeminiClient,
  callGeminiForReportSimplification,
  checkGeminiConnection,
} from './services/geminiService.js';
import { connectDatabase } from './config/database.js';

// Agent & evaluation functions
import { evaluatePatient } from '../frontend/src/data/dnaAgents.js';

// Middleware imports
import {
  validateReportInput,
  validatePatientData,
  filterClaudeResponse,
  requestValidationMiddleware,
} from './middleware/inputValidation.js';

// Utils imports
import { logger } from './utils/logger.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ============================================================================
// MIDDLEWARE
// ============================================================================

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(requestValidationMiddleware);

// ============================================================================
// ROUTE MOUNTING
// ============================================================================

// Health & Config endpoints
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'gene-guard-backend' });
});

app.use('/', healthRouter);

// DNA Agent endpoints (all 6 agents)
app.use('/api/dna', dnaAgentsRouter);

// Patient endpoints (prepared for Phase 4 auth)
app.use('/api/patients', patientsRouter);

// Patient evaluation endpoint
app.post('/api/dna/patient/evaluate', (req, res) => {
  try {
    const patient = req.body?.patient || {};
    const validated = validatePatientData(patient);
    const evaluation = evaluatePatient(validated);

    logger(`Patient evaluation: ${evaluation.level} profile`);

    res.json({
      success: true,
      evaluation,
      patientSummary: Object.entries(validated)
        .filter(([_, v]) => v)
        .map(([key, value]) => ({
          label: key.replace(/([A-Z])/g, ' $1').trim(),
          value: value || 'Not provided',
        })),
    });
  } catch (error) {
    logger(`Patient evaluation error: ${error.message}`, 'error');
    res.status(400).json({ success: false, error: error.message });
  }
});

// ============================================================================
// OPTIONAL: DIRECT REPORT SIMPLIFICATION ENDPOINT
// ============================================================================

app.post('/api/dna/simplify-report-ai', async (req, res) => {
  try {
    const { clinicalNote, geneName } = req.body;

    const validated = validateReportInput(clinicalNote);
    logger(`Direct simplify-report call for ${geneName}`);

    const explanation = await callGeminiForReportSimplification({
      geneName,
      clinicalNote: validated,
      riskLevel: 'Unknown',
      findingType: 'Unknown',
    });

    if (!explanation) {
      return res.status(503).json({ success: false, error: 'Gemini service unavailable' });
    }

    const filtered = filterClaudeResponse(explanation);

    res.json({
      success: true,
      explanation: filtered,
      aiEnhanced: true,
    });
  } catch (error) {
    logger(`Simplify report error: ${error.message}`, 'error');
    res.status(400).json({ success: false, error: error.message });
  }
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

app.use((err, req, res, next) => {
  logger(`Unhandled error: ${err.message}`, 'error');
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.use((req, res) => {
  logger(`404: ${req.method} ${req.path}`, 'warn');
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

const PORT = process.env.PORT || 5050;

const startServer = async () => {
  logger(`Starting Gene-Guard backend on port ${PORT}...`);

  // Check API key
  if (!process.env.GEMINI_API_KEY) {
    logger('WARNING: GEMINI_API_KEY not set. Gemini features will be disabled.', 'warn');
  }

  // Initialize MongoDB connection
  logger('Starting Gene-Guard backend with MongoDB integration...');

  const dbConnection = await connectDatabase();
  if (dbConnection) {
    logger('✓ MongoDB connection established');
  } else {
    logger('⚠️ MongoDB offline - using rule-based agent fallback', 'warn');
  }

  // Initialize Gemini client
  if (process.env.GEMINI_API_KEY) {
    const initialized = initGeminiClient(process.env.GEMINI_API_KEY);
    if (initialized) {
      logger('✓ Gemini client initialized');

      // Test Gemini connection (non-blocking)
      const connected = await checkGeminiConnection();
      if (connected.connected) {
        logger('✓ Gemini API connection successful');
      } else {
        logger('✗ Gemini API connection failed (will use rule-based fallback)', 'warn');
      }
    }
  }

  app.listen(PORT, () => {
    logger(`✓ Server listening on http://localhost:${PORT}`);
    logger('');
    logger('API Endpoints:');
    logger('  GET  /health - Service health check');
    logger('  GET  /api/dna/configs - Agent configurations');
    logger('  POST /api/dna/patient/evaluate - Evaluate patient profile');
    logger('  POST /api/dna/run/:agentId - Run specific DNA agent');
    logger('  POST /api/dna/simplify-report-ai - Direct report simplification');
    logger('');
    logger('Routes structure:');
    logger('  ├── /routes/dnaAgents.js - All 6 DNA agents');
    logger('  ├── /routes/health.js - Health & config endpoints');
    logger('  └── /routes/patients.js - Patient endpoints (Phase 4)');
    logger('');
  });
};

startServer().catch((error) => {
  logger(`Server startup failed: ${error.message}`, 'error');
  process.exit(1);
});

export default app;
