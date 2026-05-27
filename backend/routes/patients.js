/**
 * Patient Routes
 * Placeholder for future Phase 4 patient authentication & profile management
 *
 * Planned endpoints:
 * - POST /api/patients - Register new patient
 * - POST /api/patients/login - Patient login
 * - GET /api/patients/me - Get current patient profile
 * - GET /api/patients/me/tests - Get patient's test history
 * - GET /api/patients/me/results/:testId - Get specific test result
 */

import express from 'express';
import { logger } from '../utils/logger.js';

const router = express.Router();

/**
 * Placeholder - auth middleware will be added in Phase 4
 * Currently all routes return placeholder responses
 */

router.post('/register', (req, res) => {
  logger('Patient registration - endpoint prepared for Phase 4 implementation');
  res.status(501).json({ message: 'Patient registration coming in Phase 4' });
});

router.post('/login', (req, res) => {
  logger('Patient login - endpoint prepared for Phase 4 implementation');
  res.status(501).json({ message: 'Patient login coming in Phase 4' });
});

router.get('/me', (req, res) => {
  logger('Get patient profile - endpoint requires auth (Phase 4)');
  res.status(401).json({ message: 'Authentication required' });
});

router.get('/me/tests', (req, res) => {
  logger('Get patient test history - endpoint requires auth (Phase 4)');
  res.status(401).json({ message: 'Authentication required' });
});

router.get('/me/results/:testId', (req, res) => {
  logger(`Get test result ${req.params.testId} - endpoint requires auth (Phase 4)`);
  res.status(401).json({ message: 'Authentication required' });
});

export default router;
