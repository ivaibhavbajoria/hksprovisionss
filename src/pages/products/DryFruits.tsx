
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DryFruits = () => {
  const dryFruits = [
    {
      name: 'Premium Almonds',
      description: 'High-quality California almonds, rich in nutrients and perfect for snacking or cooking.',
      image: '/lovable-uploads/fc536805-1d3f-4562-a889-e885a819c6e8.png',
      specifications: ['Size: 18-20mm', 'Moisture: <6%', 'Origin: California', 'Grade: Premium'],
      uses: ['Direct consumption', 'Bakery products', 'Confectionery', 'Health foods']
    },
    {
      name: 'Cashew Nuts',
      description: 'Premium quality cashews sourced from the finest plantations.',
      image: '/lovable-uploads/3f6554e6-f630-45e8-8831-87f362bc90ab.png',
      specifications: ['Grade: W240/W320', 'Moisture: <5%', 'Origin: India/Vietnam', 'Color: Natural White'],
      uses: ['Snacks', 'Cooking', 'Sweets', 'Trail mixes']
    },
    {
      name: 'Walnuts',
      description: 'Fresh and crunchy walnuts with excellent nutritional value.',
      image: '/lovable-uploads/60f3b5d5-fae3-48c2-8d7d-7735f3a25c8b.png',
      specifications: ['Size: Large halves', 'Moisture: <8%', 'Origin: Kashmir/California', 'Grade: Premium'],
      uses: ['Direct consumption', 'Baking', 'Desserts', 'Health supplements']
    },
    {
      name: 'Dates',
      description: 'Sweet and nutritious dates, perfect for natural energy boost.',
      image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      specifications: ['Variety: Medjool/Deglet', 'Moisture: 18-23%', 'Origin: Middle East', 'Grade: Premium'],
      uses: ['Direct consumption', 'Natural sweetener', 'Energy bars', 'Traditional sweets']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-r from-[#2A2A6F] via-[#5353AB] to-[#362F6F] relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Premium Dry Fruits
            </h1>
            <p className="text-xl text-white opacity-90 max-w-3xl mx-auto">
              Discover our exceptional range of premium dry fruits, carefully sourced from the finest orchards 
              to bring you the highest quality nutrition and taste.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dryFruits.map((product, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow duration-300 border border-gray-200"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#2A2A6F]">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6 pt-0">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#2A2A6F] mb-2 text-sm">Specifications:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {product.specifications.map((spec, idx) => (
                        <li key={idx}>• {spec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#2A2A6F] mb-2 text-sm">Uses:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {product.uses.map((use, idx) => (
                        <span key={idx} className="text-xs bg-[#5353AB]/10 px-2 py-1 rounded text-[#2A2A6F]">
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-[#5353AB] hover:bg-[#2A2A6F] text-white transition-colors"
                    onClick={() => window.open(`https://wa.me/917397248359?text=Hi%2C%20I%20want%20a%20quote%20for%20${product.name}%20from%20HKS%20Provisions`, '_blank')}
                  >
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DryFruits;
