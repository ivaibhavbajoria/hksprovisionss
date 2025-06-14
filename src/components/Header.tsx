
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const products = [
    { name: 'Tea', href: '/products/tea' },
    { name: 'Rice', href: '/products/rice' },
    { name: 'Wheat', href: '/products/wheat' },
    { name: 'Spices', href: '/products/spices' },
    { name: 'Dry Fruits', href: '/products/dry-fruits' }
  ];

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-professional border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/ad705d13-8959-4a70-a1d6-5494972129a5.png" 
              alt="HKS Provisions Logo" 
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation - Centered with space between items */}
          <nav className="hidden lg:flex items-center justify-center flex-1 space-x-12">
            <button onClick={() => scrollToSection('home')} className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Home</button>
            <button onClick={() => scrollToSection('about')} className="text-slate-700 hover:text-blue-600 transition-colors font-medium">About Us</button>
            
            {/* Products Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 transition-colors font-medium"
              >
                <span>Products</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-elegant z-50 border border-slate-200 overflow-hidden">
                  {products.map((product) => (
                    <Link
                      key={product.name}
                      to={product.href}
                      className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors border-b border-slate-100 last:border-b-0"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => scrollToSection('certifications')} className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Quality & Process</button>
            <button onClick={() => scrollToSection('certifications')} className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Certifications</button>
            <button onClick={() => scrollToSection('why-hks')} className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Why HKS?</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Contact</button>
          </nav>

          {/* Get Quote Button - Separate from centered navigation */}
          <div className="hidden lg:block">
            <Button 
              className="gradient-primary text-white px-6 py-2 rounded-xl transition-all transform hover:scale-105 shadow-professional"
              onClick={() => window.open('https://wa.me/917397248359?text=Hi%2C%20I%20want%20a%20quote%20from%20HKS%20Provisions', '_blank')}
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 bg-white/95 backdrop-blur-lg">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('home')} className="text-slate-700 hover:text-blue-600 transition-colors px-2 py-1 text-left">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-slate-700 hover:text-blue-600 transition-colors px-2 py-1 text-left">About Us</button>
              <div className="space-y-2">
                <span className="font-semibold text-slate-700 px-2">Products:</span>
                {products.map((product) => (
                  <Link
                    key={product.name}
                    to={product.href}
                    className="block pl-4 pr-2 py-1 text-slate-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
              <button onClick={() => scrollToSection('certifications')} className="text-slate-700 hover:text-blue-600 transition-colors px-2 py-1 text-left">Quality & Process</button>
              <button onClick={() => scrollToSection('certifications')} className="text-slate-700 hover:text-blue-600 transition-colors px-2 py-1 text-left">Certifications</button>
              <button onClick={() => scrollToSection('why-hks')} className="text-slate-700 hover:text-blue-600 transition-colors px-2 py-1 text-left">Why HKS?</button>
              <button onClick={() => scrollToSection('contact')} className="text-slate-700 hover:text-blue-600 transition-colors px-2 py-1 text-left">Contact</button>
              <Button 
                className="gradient-primary text-white mt-4 mx-2 rounded-xl"
                onClick={() => window.open('https://wa.me/917397248359?text=Hi%2C%20I%20want%20a%20quote%20from%20HKS%20Provisions', '_blank')}
              >
                Get Quote
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
