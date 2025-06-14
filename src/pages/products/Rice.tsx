
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Package, Globe, Wheat, Shield } from 'lucide-react';
import { SecurityUtils } from '@/utils/security';
import { ProductionConfig } from '@/config/production';

const Rice = () => {
  const navigate = useNavigate();
  const [isSecureConnection, setIsSecureConnection] = useState(false);
  const [rateLimiter] = useState(() => SecurityUtils.createRateLimiter(3000, 5));

  useEffect(() => {
    setIsSecureConnection(SecurityUtils.isSecureConnection());
    
    if (SecurityUtils.isProduction()) {
      console.log('Production mode: Security measures active');
    }
  }, []);

  const basmatiRice = [
    {
      id: '1121-steam',
      name: '1121 Steam',
      description: 'Extra-long grain (8.3mm+), fluffy, fragrant. Premium export variety.',
      image: '/lovable-uploads/1121-steam-basmati-rice.jpg',
      moq: '1 Container (25 MT)',
      port: 'Mundra/Nhava Sheva'
    },
    {
      id: '1121-sella',
      name: '1121 Sella (Parboiled)',
      description: 'Golden yellow, firm after cooking, used in Gulf, Iran, and Africa.',
      image: '/lovable-uploads/1121-sella-basmati.jpeg',
      moq: '1 Container (25 MT)',
      port: 'Mundra/Nhava Sheva'
    },
    {
      id: '1121-raw',
      name: '1121 Raw',
      description: 'Non-parboiled, long-grain, aromatic, white appearance.',
      image: '/lovable-uploads/1121-raw.jpeg',
      moq: '1 Container (25 MT)',
      port: 'Mundra/Nhava Sheva'
    },
    {
      id: '1509-steam',
      name: '1509 Steam',
      description: 'Slightly shorter than 1121, economical and widely accepted.',
      image: '/lovable-uploads/1509-basmati-rice.jpg',
      moq: '1 Container (25 MT)',
      port: 'Mundra/Nhava Sheva'
    },
    {
      id: '1509-steam',
      name: '1509 Sella',
      description: 'Slightly shorter than 1121, economical and widely accepted.',
      image: '/lovable-uploads/1509 basmati sella.png',
      moq: '1 Container (25 MT)',
      port: 'Mundra/Nhava Sheva'
    },
    {
      id: 'traditional-basmati',
      name: 'Traditional Basmati',
      description: 'Original basmati cultivar, aged and rich aroma. Niche export.',
      image: '/lovable-uploads/traditional basmati rice.png',
      moq: '1 Container (25 MT)',
      port: 'Mundra/Nhava Sheva'
    },
    {
      id: 'sharbati',
      name: 'Sharbati (Steam/Sella)',
      description: 'Long-grain, non-aromatic, high-volume export to Middle East.',
      image: '/lovable-uploads/sharbati.png',
      moq: '1 Container (25 MT)',
      port: 'Mundra/Nhava Sheva'
    }
  ];

  const nonBasmatiRice = [
    {
      id: 'ir64',
      name: 'IR64 (Raw/Parboiled)',
      description: 'Medium grain, high yield, used for daily consumption and exports.',
      image: '/lovable-uploads/ir64.png',
      moq: '1 Container (25 MT)',
      port: 'Chennai/Visakhapatnam'
    },
    {
      id: 'sona-masoori',
      name: 'Sona Masoori (Raw/Steam)',
      description: 'Lightweight, aromatic, soft rice. South Indian favorite.',
      image: '/lovable-uploads/sona mansoori.png',
      moq: '1 Container (25 MT)',
      port: 'Chennai/Visakhapatnam'
    },
    {
      id: 'pr11',
      name: 'PR11/PR14 (Steam/Sella/Raw)',
      description: 'Long grain, non-aromatic, cost-effective rice. Mass-market favorite.',
      image: '/lovable-uploads/pr11.png',
      moq: '1 Container (25 MT)',
      port: 'Mundra/Nhava Sheva'
    },
    {
      id: 'swarna',
      name: 'Swarna (Raw/Usna)',
      description: 'Medium-grain rice, staple for PDS/government orders.',
      image: '/lovable-uploads/sawrna rice.png',
      moq: '1 Container (25 MT)',
      port: 'Chennai/Paradip'
    }
  ];

  const brokenGrades = [
    {
      id: 'mini-dubar',
      name: 'Mini Dubar',
      description: 'Shorter broken basmati grains, better quality than average broken.',
      image: '/lovable-uploads/mini dubar .png',
      moq: '1 Container (25 MT)',
      port: 'Mundra/JNPT'
    },
    {
      id: 'dubar',
      name: 'Dubar',
      description: 'Medium broken grains, used for cost-effective basmati meals.',
      image: '/lovable-uploads/dubar rice.png',
      moq: '1 Container (25 MT)',
      port: 'Mundra/JNPT'
    },
    {
      id: 'tibar',
      name: 'Tibar',
      description: 'Long broken basmati grains (60-75% length intact). Decent quality, good aroma.',
      image: '/lovable-uploads/tibar rice.png',
      moq: '1 Container (25 MT)',
      port: 'Mundra/JNPT'
    },
    {
      id: 'parmal',
      name: 'Parmal (Raw/Parboiled)',
      description: 'Common in PDS and low-cost export. Long but non-aromatic.',
      image: '/lovable-uploads/parmal rice.png',
      moq: '1 Container (25 MT)',
      port: 'Kolkata/Paradip'
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
            <Wheat className="w-16 h-16 text-white mr-4" />
            <h1 className="text-4xl lg:text-5xl font-bold">Premium Rice Collection</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl mx-auto text-center">
            High-quality rice varieties sourced from India's best rice-growing regions. 
            From aromatic Basmati to versatile non-Basmati varieties and specialized broken grades.
          </p>
        </div>
      </section>

      {renderProductGrid(basmatiRice, "Basmati Rice", "Premium aromatic long-grain varieties ideal for fine dining and export markets")}
      
      <div className="bg-gray-50">
        {renderProductGrid(nonBasmatiRice, "Non-Basmati Rice", "Bulk utility and regional types for daily consumption and mass markets")}
      </div>
      
      {renderProductGrid(brokenGrades, "Broken & Graded", "Post-processing grades sorted by size and value for various applications")}

      <Footer />
    </div>
  );
};

export default Rice;
