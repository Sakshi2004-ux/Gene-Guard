/**
 * Centralized Logging Utility
 * Provides consistent timestamp-formatted logging across the application
 */

export const logger = (message, level = 'info') => {
  const timestamp = new Date().toISOString();
  const levelUpper = level.toUpperCase();
  console.log(`[${timestamp}] [${levelUpper}] ${message}`);
};

export default logger;
