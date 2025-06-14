
import React from 'react';
import { useSecureForm } from '@/hooks/useSecureForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Shield } from 'lucide-react';
import { ProductionConfig } from '@/config/production';
import { SecurityUtils } from '@/utils/security';

const SecureContactForm = () => {
  const validationRules = {
    name: { 
      required: true, 
      minLength: 2, 
      maxLength: 50, 
      sanitize: true 
    },
    email: { 
      required: true, 
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
      maxLength: 100,
      sanitize: true 
    },
    message: { 
      required: true, 
      minLength: 10, 
      maxLength: 1000, 
      sanitize: true 
    }
  };

  const { formData, errors, isSubmitting, updateField, submitForm } = useSecureForm(validationRules);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitForm(async (data) => {
      // Prepare WhatsApp message
      const whatsappMessage = `New Contact Form Submission:
Name: ${data.name}
Email: ${data.email}
Message: ${data.message}`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${ProductionConfig.api.whatsappNumber}?text=${encodedMessage}`;
      
      // Validate URL before opening
      if (SecurityUtils.isValidUrl(whatsappUrl, ProductionConfig.security.allowedDomains)) {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } else {
        throw new Error('Invalid contact URL generated');
      }
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in hover-lift">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Shield className="w-5 h-5 text-green-500" />
          Secure Contact Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => updateField('name', e.target.value)}
              className={`transition-all ${errors.name ? 'border-red-500 animate-shake' : 'focus:border-blue-500'}`}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.name}</p>
            )}
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => updateField('email', e.target.value)}
              className={`transition-all ${errors.email ? 'border-red-500 animate-shake' : 'focus:border-blue-500'}`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.email}</p>
            )}
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message || ''}
              onChange={(e) => updateField('message', e.target.value)}
              className={`transition-all ${errors.message ? 'border-red-500 animate-shake' : 'focus:border-blue-500'}`}
              placeholder="Your message..."
              rows={4}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full animate-slide-up transition-all transform hover:scale-105"
            style={{ animationDelay: '0.4s' }}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Secure Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SecureContactForm;
