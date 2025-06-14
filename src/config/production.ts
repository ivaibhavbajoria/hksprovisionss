
// Production configuration and environment checks

export const ProductionConfig = {
  // Security settings
  security: {
    enableCSP: true,
    enableRateLimiting: true,
    maxRequestsPerMinute: 10,
    allowedDomains: ['wa.me', 'api.whatsapp.com', 'images.unsplash.com'],
    inputMaxLength: 1000,
    enableInputSanitization: true
  },

  // Performance settings
  performance: {
    enableImageLazyLoading: true,
    enableCodeSplitting: true,
    enableServiceWorker: false, // Set to true when you have a service worker
    enableGzip: true
  },

  // Monitoring settings
  monitoring: {
    enableErrorLogging: true,
    enablePerformanceTracking: true,
    enableAnalytics: false // Set to true when analytics are configured
  },

  // Feature flags
  features: {
    enableCustomBlends: true,
    enableQuoteGeneration: true,
    enableImageOptimization: true
  },

  // API configuration
  api: {
    whatsappNumber: '917397248359',
    timeout: 30000,
    retries: 3
  },

  // Cache settings
  cache: {
    enableImageCache: true,
    enableAPICache: false,
    cacheDuration: 3600000 // 1 hour
  }
};

// Environment validation
export const validateEnvironment = (): { isValid: boolean; issues: string[] } => {
  const issues: string[] = [];

  // Check if we're in a secure context in production
  if (process.env.NODE_ENV === 'production' && window.location.protocol !== 'https:') {
    issues.push('Application should use HTTPS in production');
  }

  // Check if required features are available
  if (!window.fetch) {
    issues.push('Fetch API not available');
  }

  if (!window.localStorage) {
    issues.push('LocalStorage not available');
  }

  // Check if critical APIs are accessible
  try {
    new URL('https://wa.me/test');
  } catch {
    issues.push('URL constructor not available');
  }

  return {
    isValid: issues.length === 0,
    issues
  };
};

// Initialize production settings
export const initializeProduction = (): void => {
  if (process.env.NODE_ENV === 'production') {
    console.log('🚀 Production mode initialized');
    
    // Remove console logs in production (optional)
    if (ProductionConfig.performance.enableCodeSplitting) {
      console.log = () => {};
      console.warn = () => {};
    }
    
    // Validate environment
    const validation = validateEnvironment();
    if (!validation.isValid) {
      console.error('Production validation failed:', validation.issues);
    }
  }
};
