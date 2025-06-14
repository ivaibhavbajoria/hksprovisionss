
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Products = () => {
  const products = [
    {
      id: 'tea',
      name: 'Premium Tea',
      description: 'Hand-picked tea leaves from the finest gardens. Available in various grades including CTC, Orthodox, and specialty blends.',
      image: '/lovable-uploads/c8564f2f-2861-4ad0-bd39-8371977f3d12.png',
      varieties: ['CTC Tea', 'Orthodox Tea', 'Green Tea', 'Specialty Blends'],
      whatsappText: 'Hi%2C%20I%20want%20a%20quote%20for%20Premium%20Tea%20from%20HKS%20Provisions',
      link: '/products/tea'
    },
    {
      id: 'rice',
      name: 'Quality Rice',
      description: 'Premium rice varieties including Basmati, Non-Basmati, Parboiled, and specialty rice for domestic and export markets.',
      image: '/lovable-uploads/3937756b-42f4-4217-bb17-d9a0234de196.png',
      varieties: ['Basmati Rice', 'IR64 Parboiled', 'Sona Masoori', 'Broken Rice'],
      whatsappText: 'Hi%2C%20I%20want%20a%20quote%20for%20Quality%20Rice%20from%20HKS%20Provisions',
      link: '/products/rice'
    },
    {
      id: 'wheat',
      name: 'Premium Wheat',
      description: 'High-grade wheat for flour mills and food processing. Available in different protein content and milling quality.',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      varieties: ['Durum Wheat', 'Soft Wheat', 'Hard Wheat', 'Organic Wheat'],
      whatsappText: 'Hi%2C%20I%20want%20a%20quote%20for%20Premium%20Wheat%20from%20HKS%20Provisions',
      link: '/products/wheat'
    },
    {
      id: 'spices',
      name: 'Aromatic Spices',
      description: 'Fresh and aromatic spices sourced from the best regions. Whole spices and ground spices for culinary and industrial use.',
      image: '/lovable-uploads/df62efec-97e9-4664-8b8e-6d9aa1899157.png',
      varieties: ['Turmeric', 'Coriander', 'Cumin', 'Red Chili'],
      whatsappText: 'Hi%2C%20I%20want%20a%20quote%20for%20Aromatic%20Spices%20from%20HKS%20Provisions',
      link: '/products/spices'
    },
    {
      id: 'dry-fruits',
      name: 'Premium Dry Fruits',
      description: 'High-quality dry fruits and nuts sourced from the finest orchards. Perfect for health-conscious consumers and premium gifting.',
      image: '/lovable-uploads/299ed258-beb5-4e59-b6cd-37ae04766615.png',
      varieties: ['Almonds', 'Cashews', 'Walnuts', 'Dates'],
      whatsappText: 'Hi%2C%20I%20want%20a%20quote%20for%20Premium%20Dry%20Fruits%20from%20HKS%20Provisions',
      link: '/products/dry-fruits'
    }
  ];

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
            Discover our comprehensive range of premium agricultural products, 
            carefully sourced and quality-tested for your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2 text-sm">Varieties:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {product.varieties.map((variety, idx) => (
                      <span key={idx} className="text-xs bg-purple-100 px-2 py-1 rounded text-purple-700">
                        {variety}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
                    onClick={() => window.location.href = product.link}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline"
                    size="icon"
                    className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                    onClick={() => window.open(`https://wa.me/917397248359?text=${product.whatsappText}`, '_blank', 'noopener,noreferrer')}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
