
// Security utilities for production-ready application

export class SecurityUtils {
  // Input sanitization
  static sanitizeInput(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript protocols
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/[<>]/g, '') // Remove angle brackets
      .trim();
  }

  // XSS prevention
  static escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Rate limiting
  static createRateLimiter(windowMs: number = 60000, maxRequests: number = 10) {
    const requests: number[] = [];
    
    return (): boolean => {
      const now = Date.now();
      // Remove old requests outside the window
      while (requests.length > 0 && requests[0] <= now - windowMs) {
        requests.shift();
      }
      
      if (requests.length >= maxRequests) {
        return false; // Rate limit exceeded
      }
      
      requests.push(now);
      return true; // Request allowed
    };
  }

  // Validate URLs
  static isValidUrl(url: string, allowedDomains: string[] = []): boolean {
    try {
      const urlObj = new URL(url);
      
      // Check protocol
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return false;
      }
      
      // Check allowed domains if specified
      if (allowedDomains.length > 0) {
        return allowedDomains.some(domain => urlObj.hostname.endsWith(domain));
      }
      
      return true;
    } catch {
      return false;
    }
  }

  // Content Security Policy helpers
  static setCSPHeaders(): void {
    if (typeof document !== 'undefined') {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https://images.unsplash.com https://via.placeholder.com",
        "connect-src 'self' https://api.whatsapp.com https://wa.me",
        "frame-ancestors 'none'"
      ].join('; ');
      
      document.head.appendChild(meta);
    }
  }

  // Form validation
  static validateForm(data: Record<string, any>, rules: Record<string, any>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    for (const [field, rule] of Object.entries(rules)) {
      const value = data[field];
      
      // Required field check
      if (rule.required && (!value || value.toString().trim() === '')) {
        errors.push(`${field} is required`);
        continue;
      }
      
      // Length validation
      if (value && rule.maxLength && value.toString().length > rule.maxLength) {
        errors.push(`${field} must be less than ${rule.maxLength} characters`);
      }
      
      if (value && rule.minLength && value.toString().length < rule.minLength) {
        errors.push(`${field} must be at least ${rule.minLength} characters`);
      }
      
      // Pattern validation
      if (value && rule.pattern && !rule.pattern.test(value.toString())) {
        errors.push(`${field} format is invalid`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Environment checks
  static isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  static isSecureConnection(): boolean {
    return window.location.protocol === 'https:';
  }

  // Error logging for production
  static logError(error: Error, context?: string): void {
    if (this.isProduction()) {
      // In production, you might want to send errors to a logging service
      console.error('Production Error:', {
        message: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    } else {
      console.error('Development Error:', error, context);
    }
  }
}

// Global error handler
export const setupGlobalErrorHandling = (): void => {
  window.addEventListener('error', (event) => {
    SecurityUtils.logError(event.error, 'Global error handler');
  });

  window.addEventListener('unhandledrejection', (event) => {
    SecurityUtils.logError(new Error(event.reason), 'Unhandled promise rejection');
  });
};
