
import { useState, useCallback } from 'react';
import { SecurityUtils } from '@/utils/security';
import { toast } from '@/hooks/use-toast';

interface FormValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    sanitize?: boolean;
  };
}

export const useSecureForm = (validationRules: FormValidationRules) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rateLimiter] = useState(() => SecurityUtils.createRateLimiter(5000, 3));

  const validateField = useCallback((name: string, value: any) => {
    const rule = validationRules[name];
    if (!rule) return '';

    // Sanitize input if required
    let sanitizedValue = value;
    if (rule.sanitize && typeof value === 'string') {
      sanitizedValue = SecurityUtils.sanitizeInput(value);
    }

    // Required field check
    if (rule.required && (!sanitizedValue || sanitizedValue.toString().trim() === '')) {
      return `${name} is required`;
    }

    // Length validation
    if (sanitizedValue && rule.maxLength && sanitizedValue.toString().length > rule.maxLength) {
      return `${name} must be less than ${rule.maxLength} characters`;
    }

    if (sanitizedValue && rule.minLength && sanitizedValue.toString().length < rule.minLength) {
      return `${name} must be at least ${rule.minLength} characters`;
    }

    // Pattern validation
    if (sanitizedValue && rule.pattern && !rule.pattern.test(sanitizedValue.toString())) {
      return `${name} format is invalid`;
    }

    return '';
  }, [validationRules]);

  const updateField = useCallback((name: string, value: any) => {
    // Sanitize input
    const sanitizedValue = typeof value === 'string' 
      ? SecurityUtils.sanitizeInput(value) 
      : value;

    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    
    // Validate field
    const error = validateField(name, sanitizedValue);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField, validationRules]);

  const submitForm = useCallback(async (onSubmit: (data: Record<string, any>) => Promise<void>) => {
    // Check rate limiting
    if (!rateLimiter()) {
      toast({
        title: "Rate limit exceeded",
        description: "Please wait before submitting again.",
        variant: "destructive"
      });
      return false;
    }

    setIsSubmitting(true);
    
    try {
      if (!validateForm()) {
        toast({
          title: "Validation failed",
          description: "Please check the form for errors.",
          variant: "destructive"
        });
        return false;
      }

      await onSubmit(formData);
      return true;
    } catch (error) {
      SecurityUtils.logError(error as Error, 'Form submission');
      toast({
        title: "Submission failed",
        description: "An error occurred while submitting the form.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, rateLimiter]);

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    validateForm,
    submitForm,
    setFormData
  };
};
