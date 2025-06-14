

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Professional Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 58, 138, 0.9), rgba(79, 70, 229, 0.8)), url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
          Premium Agricultural
          <br />
          <span className="text-gradient bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
            Trading Excellence
          </span>
        </h1>
        
        <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-slide-up leading-relaxed">
          Sourcing the finest Tea, Rice, Wheat & Spices from trusted farmers. 
          Your reliable partner in global agricultural trade with uncompromising quality standards.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
          <Button 
            size="lg"
            className="gradient-primary text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all transform hover:scale-105 shadow-elegant hover:shadow-premium"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            size="lg"
            className="bg-white text-slate-800 hover:bg-slate-100 border-2 border-white px-8 py-4 text-lg font-semibold rounded-xl transition-all transform hover:scale-105 shadow-elegant"
            onClick={() => window.open('https://wa.me/+917397248359?text=Hi,%20I%20want%20a%20quote%20from%20HKS%20Provisions', '_blank')}
          >
            Get Instant Quote
          </Button>
        </div>
        
        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 animate-fade-in">
          <div className="text-center glass-effect p-6 rounded-xl hover-lift">
            <div className="text-3xl lg:text-4xl font-bold text-blue-300 mb-2">500+</div>
            <div className="text-sm lg:text-base opacity-80 font-medium">Global Clients</div>
          </div>
          <div className="text-center glass-effect p-6 rounded-xl hover-lift">
            <div className="text-3xl lg:text-4xl font-bold text-indigo-300 mb-2">50+</div>
            <div className="text-sm lg:text-base opacity-80 font-medium">Countries Served</div>
          </div>
          <div className="text-center glass-effect p-6 rounded-xl hover-lift">
            <div className="text-3xl lg:text-4xl font-bold text-blue-300 mb-2">10K+</div>
            <div className="text-sm lg:text-base opacity-80 font-medium">Tons Traded</div>
          </div>
          <div className="text-center glass-effect p-6 rounded-xl hover-lift">
            <div className="text-3xl lg:text-4xl font-bold text-indigo-300 mb-2">99%</div>
            <div className="text-sm lg:text-base opacity-80 font-medium">Quality Assured</div>
          </div>
        </div>
      </div>
      
      {/* Professional Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

