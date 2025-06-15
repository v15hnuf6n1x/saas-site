
// Security configuration for the application
export const securityConfig = {
  // Content Security Policy
  csp: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    imgSrc: ["'self'", "https:", "data:"],
    scriptSrc: ["'self'"],
    connectSrc: ["'self'", "https://api.lovable.dev", "https://*.supabase.co"],
    frameSrc: ["'none'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"]
  },

  // Security headers
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  },

  // Session configuration
  session: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'strict' as const,
    secure: true,
    httpOnly: true
  }
};

// Apply security headers (for when deployed)
export const applySecurityHeaders = () => {
  if (typeof document !== 'undefined') {
    // Set CSP via meta tag as fallback
    const cspContent = Object.entries(securityConfig.csp)
      .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
      .join('; ');
    
    const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!existingCSP) {
      const meta = document.createElement('meta');
      meta.setAttribute('http-equiv', 'Content-Security-Policy');
      meta.setAttribute('content', cspContent);
      document.head.appendChild(meta);
    }
  }
};
