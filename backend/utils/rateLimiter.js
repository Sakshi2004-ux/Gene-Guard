/**
 * Rate Limiter Utility
 * Prevents API abuse by limiting calls per session/user
 *
 * Usage:
 *   const limiter = new RateLimiter(5000); // 5000 calls per 24h
 *   if (!limiter.isAllowed(sessionId)) {
 *     return res.status(429).json({ error: 'Too many requests' });
 *   }
 */

export class RateLimiter {
  constructor(maxCalls = 50, windowMs = 24 * 60 * 60 * 1000) {
    this.maxCalls = maxCalls;
    this.windowMs = windowMs;
    this.calls = new Map();
  }

  /**
   * Check if a request is allowed based on rate limit
   * @param {string} identifier - Session ID or user identifier
   * @returns {boolean} - True if under limit, false if exceeded
   */
  isAllowed(identifier) {
    const now = Date.now();
    const userCalls = this.calls.get(identifier) || [];

    // Remove old calls outside the window
    const recentCalls = userCalls.filter((timestamp) => now - timestamp < this.windowMs);

    if (recentCalls.length >= this.maxCalls) {
      return false;
    }

    recentCalls.push(now);
    this.calls.set(identifier, recentCalls);
    return true;
  }

  /**
   * Get current usage for a session
   * @param {string} identifier - Session ID
   * @returns {object} - { used, max, remaining }
   */
  getUsage(identifier) {
    const now = Date.now();
    const userCalls = this.calls.get(identifier) || [];
    const recentCalls = userCalls.filter((timestamp) => now - timestamp < this.windowMs);

    return {
      used: recentCalls.length,
      max: this.maxCalls,
      remaining: Math.max(0, this.maxCalls - recentCalls.length),
    };
  }

  /**
   * Reset usage for a session
   * @param {string} identifier - Session ID
   */
  reset(identifier) {
    this.calls.delete(identifier);
  }

  /**
   * Clear all usage data
   */
  clearAll() {
    this.calls.clear();
  }
}

export default RateLimiter;
