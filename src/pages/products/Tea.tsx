
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Package, Globe, Leaf, Coffee, Blend, Sparkles, Shield } from 'lucide-react';
import { SecurityUtils } from '@/utils/security';
import { ProductionConfig } from '@/config/production';

const Tea = () => {
  const navigate = useNavigate();
  const [isSecureConnection, setIsSecureConnection] = useState(false);
  const [rateLimiter] = useState(() => SecurityUtils.createRateLimiter(3000, 5));
  
  // Custom blend form state
  const [customBlendForm, setCustomBlendForm] = useState({
    name: '',
    gradePercentage: '',
    quantity: '',
    description: ''
  });

  useEffect(() => {
    setIsSecureConnection(SecurityUtils.isSecureConnection());
    
    if (SecurityUtils.isProduction()) {
      console.log('Production mode: Security measures active');
    }
  }, []);

  const ctcGrades = [
    { 
      id: 'bp', 
      name: 'BP (Broken Pekoe)', 
      description: 'Large leaf grade with excellent brewing strength',
      color: 'bg-amber-500',
      image: '/lovable-uploads/2c40f678-490e-4a96-8b5e-4c7e7dd1dfbf.png'
    },
    { 
      id: 'bop', 
      name: 'BOP (Broken Orange Pekoe)', 
      description: 'Premium grade with bold granules and malty flavor',
      color: 'bg-orange-500',
      image: '/lovable-uploads/5f26ce2f-bda5-4101-b414-fecf6c40f797.png'
    },
    { 
      id: 'bps', 
      name: 'BPS (Broken Pekoe Souchong)', 
      description: 'Medium grade with good color and strength',
      color: 'bg-yellow-600',
      image: '/lovable-uploads/7f480447-8077-4fa0-86a4-e24a616839a2.png'
    },
    { 
      id: 'of', 
      name: 'OF (Orange Fannings)', 
      description: 'Small grade particles perfect for strong quick brewing',
      color: 'bg-orange-600',
      image: '/lovable-uploads/314baa67-02ea-40ae-85ce-958a11a253ab.png'
    },
    { 
      id: 'bopsm', 
      name: 'BOPSM (BOP Small Medium)', 
      description: 'Small-medium grade perfect for quick brewing',
      color: 'bg-red-500',
      image: '/lovable-uploads/44edd40a-63d8-4f1e-a9da-685f7241fc1e.png'
    },
    { 
      id: 'pd', 
      name: 'PD (Pekoe Dust)', 
      description: 'Fine grade ideal for strong milk tea',
      color: 'bg-brown-500',
      image: '/lovable-uploads/ddd3ba1d-2b7d-4780-b02c-4370ed2d6493.png'
    }
  ];

  const blends = [
    {
      id: 'lite',
      name: 'Lite Blend',
      description: 'Light and refreshing blend perfect for everyday consumption',
      features: ['Mild strength', 'Golden color', 'Smooth taste'],
      color: 'bg-green-500',
      image: '/lovable-uploads/a289d3ed-45d8-4674-a383-1bc70492d1bb.png'
    },
    {
      id: 'gold',
      name: 'Gold Blend',
      description: 'Premium balanced blend with rich aroma and full body',
      features: ['Medium strength', 'Rich golden brew', 'Aromatic'],
      color: 'bg-yellow-500',
      image: '/lovable-uploads/bd8724d0-9378-4a03-8f8f-b6563548034c.png'
    },
    {
      id: 'premium',
      name: 'Premium Blend',
      description: 'Superior quality blend for connoisseurs and export markets',
      features: ['Full strength', 'Deep amber color', 'Complex flavor'],
      color: 'bg-purple-600',
      image: '/lovable-uploads/3120b0b9-d54e-49bb-b2cc-db859c2d7685.png'
    }
  ];

  const handleSecureQuote = (productName: string, description: string) => {
    if (!rateLimiter()) {
      alert('Please wait a moment before sending another message.');
      return;
    }

    const sanitizedName = SecurityUtils.sanitizeInput(productName);
    const sanitizedDescription = SecurityUtils.sanitizeInput(description);

    if (!SecurityUtils.validateForm({ name: sanitizedName }, { name: { required: true, maxLength: 100 } }).isValid) {
      alert('Invalid product name');
      return;
    }

    const whatsappMessage = `Hi HKS Provisions,

I'm interested in your ${sanitizedName}.

${sanitizedDescription}

Please share the latest quote with specifications and pricing.

Thank you!`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${ProductionConfig.api.whatsappNumber}?text=${encodedMessage}`;
    
    if (SecurityUtils.isValidUrl(whatsappUrl, ProductionConfig.security.allowedDomains)) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } else {
      SecurityUtils.logError(new Error('Invalid WhatsApp URL generated'), 'Quote generation');
    }
  };

  const handleCustomBlendQuote = () => {
    if (!rateLimiter()) {
      alert('Please wait a moment before sending another message.');
      return;
    }

    const { name, gradePercentage, quantity, description } = customBlendForm;
    
    // Validate form
    const validation = SecurityUtils.validateForm(customBlendForm, {
      name: { required: true, maxLength: 100 },
      gradePercentage: { required: true, maxLength: 200 },
      quantity: { required: true, maxLength: 50 },
      description: { required: true, maxLength: 500 }
    });

    if (!validation.isValid) {
      alert('Please fill all fields correctly: ' + validation.errors.join(', '));
      return;
    }

    const sanitizedData = {
      name: SecurityUtils.sanitizeInput(name),
      gradePercentage: SecurityUtils.sanitizeInput(gradePercentage),
      quantity: SecurityUtils.sanitizeInput(quantity),
      description: SecurityUtils.sanitizeInput(description)
    };

    const whatsappMessage = `Hi HKS Provisions,

I would like to request a quote for a Custom Tea Blend:

Blend Name: ${sanitizedData.name}
Grade Composition: ${sanitizedData.gradePercentage}
Required Quantity: ${sanitizedData.quantity}
Description: ${sanitizedData.description}

Please provide pricing and availability details.

Thank you!`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${ProductionConfig.api.whatsappNumber}?text=${encodedMessage}`;
    
    if (SecurityUtils.isValidUrl(whatsappUrl, ProductionConfig.security.allowedDomains)) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      // Reset form
      setCustomBlendForm({ name: '', gradePercentage: '', quantity: '', description: '' });
    } else {
      SecurityUtils.logError(new Error('Invalid WhatsApp URL generated'), 'Custom blend quote');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomBlendForm(prev => ({
      ...prev,
      [field]: SecurityUtils.sanitizeInput(value)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#DEDDF5] to-white">
      <Header />
      
      {!isSecureConnection && (
        <div className="bg-yellow-500 text-white p-2 text-center text-sm">
          <Shield className="inline w-4 h-4 mr-2" />
          Notice: This connection is not secure. Please use HTTPS in production.
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2A2A6F] via-[#5353AB] to-[#362F6F] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Leaf className="w-16 h-16 text-white mr-4" />
            <h1 className="text-5xl lg:text-6xl font-bold">Premium Tea Collection</h1>
          </div>
          <p className="text-xl opacity-90 max-w-4xl mx-auto text-center leading-relaxed">
            Discover our finest quality tea sourced from renowned gardens across India. 
            From robust CTC grades to expertly crafted blends and custom solutions for your unique requirements.
          </p>
        </div>
      </section>

      {/* CTC Grades Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Coffee className="w-10 h-10 text-[#5353AB] mr-3" />
              <h2 className="text-4xl font-bold text-[#2A2A6F]">CTC Grades</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium Crush, Tear, Curl grades offering varying strengths and brewing characteristics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ctcGrades.map((grade) => (
              <Card key={grade.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={grade.image} 
                      alt={grade.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`}></div>
                    <div className={`${grade.color} h-2 w-full absolute bottom-0`}></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#2A2A6F] mb-3">{grade.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{grade.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <Package className="w-4 h-4 mr-2" />
                      <span>Available in bulk quantities</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-[#5353AB] hover:bg-[#2A2A6F] text-white py-3 font-semibold"
                      onClick={() => handleSecureQuote(grade.name, grade.description)}
                    >
                      Get Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blends Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Blend className="w-10 h-10 text-[#5353AB] mr-3" />
              <h2 className="text-4xl font-bold text-[#2A2A6F]">Signature Blends</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expertly crafted blends to suit different taste preferences and market segments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {blends.map((blend) => (
              <Card key={blend.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={blend.image} 
                      alt={blend.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`}></div>
                    <div className={`${blend.color} h-3 w-full absolute bottom-0`}></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#2A2A6F] mb-3">{blend.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{blend.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {blend.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-[#5353AB] rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-[#5353AB] hover:bg-[#2A2A6F] text-white py-3 font-semibold"
                      onClick={() => handleSecureQuote(blend.name, blend.description)}
                    >
                      Get Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Blend Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-10 h-10 text-[#5353AB] mr-3" />
              <h2 className="text-4xl font-bold text-[#2A2A6F]">Custom Tea Blend</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create your own unique tea blend with custom specifications
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-white">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-[#2A2A6F] mb-2">
                      Blend Name *
                    </label>
                    <Input
                      placeholder="e.g., Royal Morning Blend"
                      value={customBlendForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="border-[#5353AB] focus:ring-[#5353AB]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[#2A2A6F] mb-2">
                      Required Quantity *
                    </label>
                    <Input
                      placeholder="e.g., 1000 kg, 50 MT"
                      value={customBlendForm.quantity}
                      onChange={(e) => handleInputChange('quantity', e.target.value)}
                      className="border-[#5353AB] focus:ring-[#5353AB]"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#2A2A6F] mb-2">
                    Grade Composition & Percentage *
                  </label>
                  <Input
                    placeholder="e.g., 40% BOP, 30% BOPSM, 20% OF, 10% PD"
                    value={customBlendForm.gradePercentage}
                    onChange={(e) => handleInputChange('gradePercentage', e.target.value)}
                    className="border-[#5353AB] focus:ring-[#5353AB]"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-[#2A2A6F] mb-2">
                    Blend Description & Requirements *
                  </label>
                  <Textarea
                    placeholder="Describe your blend requirements, taste profile, strength, color, intended use, target market, etc."
                    rows={4}
                    value={customBlendForm.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="border-[#5353AB] focus:ring-[#5353AB]"
                  />
                </div>

                <Button 
                  onClick={handleCustomBlendQuote}
                  className="w-full bg-[#5353AB] hover:bg-[#2A2A6F] text-white py-4 text-lg font-semibold"
                  disabled={!customBlendForm.name || !customBlendForm.gradePercentage || !customBlendForm.quantity || !customBlendForm.description}
                >
                  Get Custom Blend Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tea;
