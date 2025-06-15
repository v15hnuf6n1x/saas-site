
import DOMPurify from 'dompurify';

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Security utilities
export const securityUtils = {
  // Sanitize HTML content to prevent XSS
  sanitizeHtml: (dirty: string): string => {
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
      ALLOWED_ATTR: ['href', 'target']
    });
  },

  // Sanitize user input for safe database storage
  sanitizeInput: (input: string): string => {
    return input.trim().replace(/[<>'"]/g, '');
  },

  // Simple rate limiting
  checkRateLimit: (identifier: string, maxRequests: number = 5, windowMs: number = 15 * 60 * 1000): boolean => {
    const now = Date.now();
    const record = rateLimitStore.get(identifier);

    if (!record || now > record.resetTime) {
      rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (record.count >= maxRequests) {
      return false;
    }

    record.count++;
    return true;
  },

  // Log security events
  logSecurityEvent: (event: string, details: Record<string, any> = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.warn('Security Event:', logEntry);
    
    // In production, send to logging service
    if (process.env.NODE_ENV === 'production') {
      // Send to your logging service here
    }
  },

  // Validate email format
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  // Generate secure random string
  generateSecureToken: (length: number = 32): string => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
};
