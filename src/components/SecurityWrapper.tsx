
import React, { useEffect, useState } from 'react';
import { SecurityUtils } from '@/utils/security';
import { AlertTriangle } from 'lucide-react';

interface SecurityWrapperProps {
  children: React.ReactNode;
}

const SecurityWrapper: React.FC<SecurityWrapperProps> = ({ children }) => {
  const [securityStatus, setSecurityStatus] = useState({
    isSecure: true,
    warnings: [] as string[]
  });

  useEffect(() => {
    const warnings: string[] = [];
    
    // Check for HTTPS in production
    if (SecurityUtils.isProduction() && !SecurityUtils.isSecureConnection()) {
      warnings.push('This site is not using HTTPS. Your data may not be secure.');
    }
    
    // Check for required security features
    if (!window.crypto || !window.crypto.subtle) {
      warnings.push('Modern encryption features are not available in this browser.');
    }
    
    setSecurityStatus({
      isSecure: warnings.length === 0,
      warnings
    });
  }, []);

  return (
    <>
      {securityStatus.warnings.length > 0 && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white p-2 animate-slide-down">
          <div className="container mx-auto flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            <span className="text-sm">{securityStatus.warnings[0]}</span>
          </div>
        </div>
      )}
      
      <div className="security-wrapper">
        {children}
      </div>
    </>
  );
};

export default SecurityWrapper;
