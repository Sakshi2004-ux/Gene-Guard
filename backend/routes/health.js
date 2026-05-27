/**
 * Health Check Routes
 * Basic status endpoints for monitoring and configuration
 */

import express from 'express';
import { dnaAgentConfigs } from '../../Gene-Guard-main/src/data/dnaAgents.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

/**
 * GET /health
 * Service health check
 */
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'gene-guard-backend' });
});

/**
 * GET /api/dna/configs
 * Fetch all DNA agent configurations
 */
router.get('/api/dna/configs', (req, res) => {
  logger('Fetching agent configs');
  res.json({ success: true, agents: dnaAgentConfigs });
});

export default router;
