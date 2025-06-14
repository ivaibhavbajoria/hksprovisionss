import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Package, Globe, Flower, Shield } from 'lucide-react';
import { SecurityUtils } from '@/utils/security';
import { ProductionConfig } from '@/config/production';

const Spices = () => {
  const navigate = useNavigate();
  const [isSecureConnection, setIsSecureConnection] = useState(false);
  const [rateLimiter] = useState(() => SecurityUtils.createRateLimiter(3000, 5));

  useEffect(() => {
    setIsSecureConnection(SecurityUtils.isSecureConnection());
    
    if (SecurityUtils.isProduction()) {
      console.log('Production mode: Security measures active');
    }
  }, []);

  const wholeSpices = [
    {
      id: 'cumin-seeds',
      name: 'Cumin Seeds (Jeera)',
      description: 'Premium quality cumin seeds with rich aroma and flavor, essential for Indian cuisine.',
      image: '/lovable-uploads/3788a3f1-b68a-4735-80f1-64f26e2e05b2.png',
      moq: '1 MT',
      port: 'Mundra/Chennai'
    },
    {
      id: 'fennel-seeds',
      name: 'Fennel Seeds (Saunf)',
      description: 'Sweet aromatic fennel seeds, excellent for digestive health and culinary applications.',
      image: '/lovable-uploads/904e955d-b148-4dc3-b7c3-f809b28e9e33.png',
      moq: '1 MT',
      port: 'Mundra/Chennai'
    },
    {
      id: 'coriander-seeds',
      name: 'Coriander Seeds',
      description: 'High-quality coriander seeds with fresh citrusy aroma, perfect for spice blends.',
      image: '/lovable-uploads/b4f8a8db-bac8-4366-9b44-6a2d0504463b.png',
      moq: '1 MT',
      port: 'Mundra/Chennai'
    },
    {
      id: 'black-pepper',
      name: 'Black Pepper',
      description: 'Premium black pepper with high piperine content, the king of spices.',
      image: '/lovable-uploads/ae4756d0-d3f4-454c-8a55-4c7543615c06.png',
      moq: '1 MT',
      port: 'Cochin/Chennai'
    },
    {
      id: 'cardamom',
      name: 'Cardamom (Green/Black)',
      description: 'Premium cardamom pods with intense aroma, queen of spices for premium applications.',
      image: '/lovable-uploads/af679c39-3435-48ec-8dbd-367cafff633d.png',
      moq: '100 Kg',
      port: 'Cochin/Chennai'
    },
    {
      id: 'mustard-seeds',
      name: 'Mustard Seeds',
      description: 'Yellow, black, and brown mustard seeds with pungent flavor and oil content.',
      image: '/lovable-uploads/ca8eb102-9ca3-489f-bcbd-64fa06693f31.png',
      moq: '1 MT',
      port: 'Mundra/Kandla'
    }
  ];

  const groundSpices = [
    {
      id: 'turmeric-powder',
      name: 'Turmeric Powder',
      description: 'High curcumin content turmeric powder with bright yellow color and medicinal properties.',
      image: '/lovable-uploads/1bef739c-e04f-4aea-94dc-f40b775e19e5.png',
      moq: '1 MT',
      port: 'Chennai/Tuticorin'
    },
    {
      id: 'red-chilli-powder',
      name: 'Red Chilli Powder',
      description: 'Premium red chilli powder with high color value and balanced heat levels.',
      image: '/lovable-uploads/76ed1659-684f-4da1-949e-5c96dd60e7d4.png',
      moq: '1 MT',
      port: 'Chennai/Guntur'
    },
    {
      id: 'coriander-powder',
      name: 'Coriander Powder',
      description: 'Finely ground coriander powder with fresh aroma and natural oil content.',
      image: '/lovable-uploads/33cab5a7-135f-4480-87c1-01588a381afd.png',
      moq: '1 MT',
      port: 'Mundra/Chennai'
    },
    {
      id: 'cumin-powder',
      name: 'Cumin Powder',
      description: 'Fresh ground cumin powder with strong aroma and earthy flavor profile.',
      image: '/lovable-uploads/4c7d6ec7-247f-4328-8452-3a34f1d069fc.png',
      moq: '1 MT',
      port: 'Mundra/Chennai'
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

  const renderProductGrid = (products: any[], title: string, subtitle: string) => (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-[#2A2A6F] mb-4">{title}</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#5353AB] text-white">{title.split(' ')[0]}</Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold text-[#2A2A6F] mb-3">{product.name}</h4>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Package className="w-4 h-4 mr-2" />
                      MOQ: {product.moq}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Globe className="w-4 h-4 mr-2" />
                      {product.port}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-[#5353AB] hover:bg-[#2A2A6F] text-white"
                    onClick={() => handleSecureQuote(product.name, product.description)}
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
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {!isSecureConnection && (
        <div className="bg-yellow-500 text-white p-2 text-center text-sm">
          <Shield className="inline w-4 h-4 mr-2" />
          Notice: This connection is not secure. Please use HTTPS in production.
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2A2A6F] via-[#5353AB] to-[#362F6F] text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Flower className="w-16 h-16 text-white mr-4" />
            <h1 className="text-4xl lg:text-5xl font-bold">Aromatic Spices Collection</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl mx-auto text-center">
            Premium quality spices sourced from India's finest spice-growing regions. 
            Fresh, aromatic, and perfect for culinary and industrial applications.
          </p>
        </div>
      </section>

      {renderProductGrid(wholeSpices, "Whole Spices", "Premium whole spices with natural oils and authentic flavors")}
      
      <div className="bg-gray-50">
        {renderProductGrid(groundSpices, "Ground Spices", "Freshly ground spices with maximum flavor retention and purity")}
      </div>

      <Footer />
    </div>
  );
};

export default Spices;
