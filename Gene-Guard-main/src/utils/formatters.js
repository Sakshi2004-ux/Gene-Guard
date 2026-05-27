/**
 * Frontend Utility Helpers
 * Common functions used across the application
 */

import { marked } from 'marked';

// Configure marked for safe, clean output
marked.setOptions({
  breaks: true,     // Convert \n to <br>
  gfm: true,        // GitHub Flavored Markdown
});

/**
 * Parse markdown text into safe HTML
 * @param {string} text - Markdown text
 * @returns {string} - HTML string
 */
export const parseMarkdown = (text) => {
  if (!text) return '';
  return marked.parse(text);
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date (e.g. "4 Apr 2026")
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

/**
 * Format time elapsed (e.g. "2 seconds ago")
 * @param {Date|number} timestamp - Time to format
 * @returns {string} - Elapsed time description
 */
export const formatTimeAgo = (timestamp) => {
  const now = Date.now();
  const diff = now - new Date(timestamp).getTime();
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return formatDate(timestamp);
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert camelCase to title case
 * @param {string} str - camelCase string
 * @returns {string} - Title Case String
 */
export const camelCaseToTitleCase = (str) => {
  if (!str) return '';
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
};

/**
 * Wait for specified milliseconds
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} - Resolves after delay
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Debounce function - prevent rapid consecutive calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Check if value is empty (null, undefined, empty string, empty array)
 * @param {*} value - Value to check
 * @returns {boolean} - True if empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
};

/**
 * Parse error message from various error formats
 * @param {*} error - Error object or string
 * @returns {string} - Error message
 */
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.response?.data?.message) return error.response.data.message;
  return 'An unknown error occurred';
};

export default {
  formatDate,
  formatTimeAgo,
  capitalize,
  camelCaseToTitleCase,
  delay,
  debounce,
  isEmpty,
  getErrorMessage,
};
