import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Globe } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      icon: <Shield className="w-12 h-12 text-[#5353AB]" />,
      title: 'FSSAI Certified',
      description: 'Food Safety and Standards Authority of India certification ensuring food safety compliance.',
      details: 'Valid License | Regular Audits | Compliance Maintained'
    },
    {
      icon: <Globe className="w-12 h-12 text-[#5353AB]" />,
      title: 'Export Compliant',
      description: 'Meeting all international export standards and documentation requirements.',
      details: 'Export Documentation | International Standards | Global Compliance'
    }
  ];

  const qualityAssurance = [
    'Laboratory Testing for all products',
    'Moisture content analysis',
    'Purity and quality checks',
    'Pesticide residue testing',
    'Packaging quality control',
    'Cold storage facilities',
    'Traceability systems',
    'Regular supplier audits'
  ];

  return (
    <section id="certifications" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2A2A6F] mb-4">
            Certifications & Quality
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to quality is backed by internationally recognized 
            certifications and rigorous quality control processes.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
            {certifications.map((cert, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg group"
              >
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {cert.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#2A2A6F] mb-3 group-hover:text-[#5353AB] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {cert.description}
                  </p>
                  <div className="text-xs text-[#5353AB] bg-[#DEDDF5] px-3 py-2 rounded-lg">
                    {cert.details}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quality Process */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold text-[#2A2A6F] mb-6">Quality Assurance Process</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our comprehensive quality assurance process ensures that every product 
              meets the highest standards from source to delivery. We maintain strict 
              quality controls at every stage of the supply chain.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {qualityAssurance.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#5353AB] rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Quality testing laboratory"
              className="rounded-lg shadow-xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A6F]/20 to-transparent rounded-lg"></div>
            
            {/* Quality Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#2A2A6F]">99.9%</div>
                    <div className="text-xs text-gray-600">Quality Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#2A2A6F]">100%</div>
                    <div className="text-xs text-gray-600">Lab Tested</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#2A2A6F]">24/7</div>
                    <div className="text-xs text-gray-600">Quality Control</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Flow */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-[#2A2A6F] mb-12 text-center">Our Quality Process</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Sourcing', description: 'Direct sourcing from verified farmers and suppliers' },
              { step: '02', title: 'Testing', description: 'Comprehensive laboratory testing for quality parameters' },
              { step: '03', title: 'Processing', description: 'Clean processing with modern machinery and techniques' },
              { step: '04', title: 'Packaging', description: 'Hygienic packaging with proper labeling and documentation' }
            ].map((process, index) => (
              <Card key={index} className="relative border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-[#5353AB] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {process.step}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-[#2A2A6F] mb-3 mt-4">{process.title}</h4>
                  <p className="text-gray-600 text-sm">{process.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
