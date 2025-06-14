import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Globe, Users, Award } from 'lucide-react';

const About = () => {
  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started our journey in agro trading with a vision to connect quality products with global markets.'
    },
    {
      year: '2021',
      title: 'First Export',
      description: 'Successfully exported our first consignment of premium basmati rice to international markets.'
    },
    {
      year: '2022',
      title: 'Product Expansion',
      description: 'Expanded our product portfolio to include tea, wheat, and spices alongside rice.'
    },
    {
      year: '2023',
      title: 'Quality Certifications',
      description: 'Obtained FSSAI, ISO certifications ensuring the highest quality standards.'
    },
    {
      year: '2024',
      title: 'Global Reach',
      description: 'Now serving 50+ countries with our premium agricultural products.'
    },
    {
      year: '2025',
      title: 'Corporate Expansion',
      description: 'Incorporated OSSDN PROVISIONS PVT LTD for strategic expansion and enhanced market reach in agricultural trading.'
    }
  ];

  const values = [
    {
      icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
      title: 'Quality Assurance',
      description: 'Every product undergoes rigorous quality checks before reaching our customers.'
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: 'Global Standards',
      description: 'We maintain international quality standards in all our operations.'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: 'Customer First',
      description: 'Building long-term relationships through exceptional service and reliability.'
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: 'Excellence',
      description: 'Committed to excellence in everything we do, from sourcing to delivery.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* About Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            About HKS Provisions
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We are a dynamic agro trading company committed to bridging the gap between 
            quality agricultural products and global markets. Our expertise spans across 
            premium tea, rice, wheat, and spices, ensuring exceptional quality and service.
          </p>
        </div>

        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded with a passion for connecting premium agricultural products with global markets, 
              HKS Provisions has grown from a local trading company to a trusted international partner. 
              We believe in the power of quality, transparency, and building lasting relationships.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our team of experts works closely with farmers and suppliers to ensure that every product 
              meets the highest standards of quality and freshness. From the fields to your doorstep, 
              we maintain complete control over the supply chain.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Agricultural fields"
              className="rounded-lg shadow-xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-lg"></div>
          </div>
        </div>

        {/* Company Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Journey</h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-purple-200 hidden lg:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="lg:w-1/2 lg:px-8">
                    <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {milestone.year}
                          </div>
                          <h4 className="text-xl font-bold text-gray-800 ml-4">{milestone.title}</h4>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden lg:block w-4 h-4 bg-purple-600 rounded-full relative z-10 mx-4"></div>
                  
                  <div className="lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Values */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">{value.title}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
