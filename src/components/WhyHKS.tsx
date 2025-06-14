
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Truck, DollarSign, Clock, Globe, Award } from 'lucide-react';

const WhyHKS = () => {
  const benefits = [
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: 'Quality Assurance',
      description: 'Rigorous quality control at every step ensures premium products that meet international standards.',
      details: ['FSSAI Certified', 'Lab Tested', 'ISO Compliant', 'Traceability'],
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: <Truck className="w-12 h-12 text-indigo-600" />,
      title: 'Reliable Logistics',
      description: 'Efficient supply chain management with timely delivery to any destination worldwide.',
      details: ['Global Shipping', 'Cold Storage', 'Real-time Tracking', 'Secure Packaging'],
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <DollarSign className="w-12 h-12 text-blue-600" />,
      title: 'Competitive Pricing',
      description: 'Direct sourcing and efficient operations allow us to offer the best prices in the market.',
      details: ['Direct Sourcing', 'Bulk Discounts', 'Flexible Payment', 'Price Matching'],
      gradient: 'from-blue-600 to-slate-600'
    },
    {
      icon: <Clock className="w-12 h-12 text-slate-600" />,
      title: 'Quick Response',
      description: '24/7 customer support with rapid response times for all your business needs.',
      details: ['24/7 Support', 'Quick Quotes', 'Fast Processing', 'Emergency Orders'],
      gradient: 'from-slate-600 to-blue-600'
    },
    {
      icon: <Globe className="w-12 h-12 text-indigo-600" />,
      title: 'Global Reach',
      description: 'Extensive network spanning 50+ countries with local understanding of markets.',
      details: ['50+ Countries', 'Local Expertise', 'Market Knowledge', 'Cultural Understanding'],
      gradient: 'from-indigo-600 to-blue-600'
    },
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: 'Trusted Partner',
      description: 'Building long-term relationships through transparency, reliability, and excellence.',
      details: ['500+ Clients', 'Repeat Business', 'References Available', 'Industry Recognition'],
      gradient: 'from-blue-600 to-indigo-600'
    }
  ];

  return (
    <section id="why-hks" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gradient">
              Why Choose HKS Provisions?
            </h2>
            <div className="w-24 h-1 gradient-primary mx-auto rounded-full"></div>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mt-6 leading-relaxed">
            We combine decades of experience with modern technology to deliver 
            exceptional value to our partners across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="group relative bg-white hover:shadow-premium transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border-0 shadow-elegant hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
              <div className="absolute inset-[1px] bg-white rounded-lg"></div>
              
              <CardContent className="relative p-8 text-center h-full flex flex-col">
                {/* Icon with glow effect */}
                <div className="flex justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
                  <div className="relative p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full border border-blue-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {benefit.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-blue-700 transition-colors duration-300">
                  {benefit.title}
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                  {benefit.description}
                </p>
                
                <div className="space-y-3">
                  {benefit.details.map((detail, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-center text-sm group-hover:transform group-hover:translate-x-1 transition-transform duration-300"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      <div className="w-2 h-2 gradient-primary rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-slate-500 group-hover:text-slate-700 transition-colors duration-300">{detail}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-20">
          <div className="relative glass-effect rounded-3xl p-10 max-w-4xl mx-auto border border-blue-200 hover:border-blue-300 transition-all duration-500 group hover-lift">
            {/* Animated background */}
            <div className="absolute inset-0 gradient-primary rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-gradient">
                Ready to Partner with Us?
              </h3>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join hundreds of satisfied clients who trust HKS Provisions for their agricultural trading needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="gradient-primary text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-elegant hover:shadow-premium border border-blue-300"
                  onClick={() => window.open('https://wa.me/917397248389?text=Hi%2C%20I%20want%20to%20partner%20with%20HKS%20Provisions', '_blank')}
                >
                  Get Started Today
                </button>
                <button 
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyHKS;
