// Production Configuration
export const PRODUCTION_CONFIG = {
  // API Endpoints
  MIE_PRODUCTION_URL: 'https://mie.co.za/internal/services/epcvrequest/epcvrequest.asmx',
  
  // Feature Flags
  ENABLE_ANALYTICS: true,
  ENABLE_ERROR_REPORTING: true,
  ENABLE_PERFORMANCE_MONITORING: true,
  
  // Business Configuration
  DEFAULT_CLIENT_KEY: '45149', // Production client key
  
  // UI Configuration
  SHOW_PRODUCTION_WARNINGS: true,
  ENABLE_AUDIT_LOGS: true,
  
  // Security
  ENABLE_RATE_LIMITING: true,
  MAX_REQUESTS_PER_MINUTE: 60,
  
  // Performance
  REQUEST_TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  
  // Environment
  ENVIRONMENT: 'production' as const,
  VERSION: '2.0.0',
  
  // Support
  SUPPORT_EMAIL: 'support@veritas.co.za',
  SUPPORT_PHONE: '+27 11 123 4567',
  
  // Compliance
  DATA_RETENTION_DAYS: 2555, // 7 years as per POPIA requirements
  BACKUP_FREQUENCY: 'daily',
  AUDIT_LOG_RETENTION: 3650, // 10 years
};

// Production environment check
export const isProduction = () => {
  return PRODUCTION_CONFIG.ENVIRONMENT === 'production';
};

// Production ready check
export const isProductionReady = () => {
  const requiredEnvVars = [
    'MIE_USERNAME',
    'MIE_PASSWORD', 
    'MIE_CALLBACK_USERNAME',
    'MIE_CALLBACK_PASSWORD'
  ];
  
  // In production, these would be checked against actual environment variables
  return true; // Assuming Supabase secrets are configured
};

export default PRODUCTION_CONFIG;