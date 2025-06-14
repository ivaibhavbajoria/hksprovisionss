
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: '',
    quantity: '',
    destination: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const whatsappMessage = `
Hello HKS Provisions,

I am interested in your products. Here are my details:

Name: ${formData.name}
Company: ${formData.company || 'Not specified'}
Email: ${formData.email}
Phone: ${formData.phone}
Interested Product: ${formData.product}
Approximate Quantity: ${formData.quantity}
Destination: ${formData.destination}

Message: ${formData.message}

Please provide me with a detailed quote.

Thank you!
    `.trim();
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/917397248359?text=${encodedMessage}`, '_blank');
    
    toast({
      title: "Inquiry Sent!",
      description: "Your inquiry has been sent via WhatsApp. We'll respond shortly.",
    });
    
    // Reset form
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      product: '',
      quantity: '',
      destination: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-[#5353AB]" />,
      title: 'Phone',
      details: '+91 73972 48359, +91 86304 40226',
      action: () => window.open('tel:+917397248359')
    },
    {
      icon: <Mail className="w-6 h-6 text-[#5353AB]" />,
      title: 'Email',
      details: 'hksprovision@gmail.com',
      action: () => window.open('mailto:hksprovision@gmail.com')
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#5353AB]" />,
      title: 'Address',
      details: 'P50, KOLKATA 700054',
      action: () => window.open('https://maps.google.com/?q=P50,+KOLKATA+700054')
    },
    {
      icon: <Clock className="w-6 h-6 text-[#5353AB]" />,
      title: 'Business Hours',
      details: 'Mon - Sat: 9:00 AM - 6:00 PM',
      action: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-white to-[#DEDDF5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2A2A6F] mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your next order? Contact us today for competitive quotes 
            and exceptional service.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold text-[#2A2A6F] mb-6 text-center">Send Us an Inquiry</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      className="border-[#DEDDF5] focus:border-[#5353AB]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Company name (optional)"
                      className="border-[#DEDDF5] focus:border-[#5353AB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className="border-[#DEDDF5] focus:border-[#5353AB]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="border-[#DEDDF5] focus:border-[#5353AB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interested Product *
                    </label>
                    <Select required onValueChange={(value) => handleInputChange('product', value)}>
                      <SelectTrigger className="border-[#DEDDF5] focus:border-[#5353AB]">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tea">Premium Tea</SelectItem>
                        <SelectItem value="rice">Quality Rice</SelectItem>
                        <SelectItem value="wheat">Premium Wheat</SelectItem>
                        <SelectItem value="spices">Aromatic Spices</SelectItem>
                        <SelectItem value="multiple">Multiple Products</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Approximate Quantity
                    </label>
                    <Input
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', e.target.value)}
                      placeholder="e.g., 100 MT, 50 Tons"
                      className="border-[#DEDDF5] focus:border-[#5353AB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination *
                  </label>
                  <Select required onValueChange={(value) => handleInputChange('destination', value)}>
                    <SelectTrigger className="border-[#DEDDF5] focus:border-[#5353AB]">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="domestic">Domestic (India)</SelectItem>
                      <SelectItem value="export">Export (International)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us more about your requirements..."
                    rows={4}
                    className="border-[#DEDDF5] focus:border-[#5353AB]"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-[#5353AB] hover:bg-[#362F6F] text-white py-4 text-lg font-semibold"
                >
                  Send Inquiry via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-[#2A2A6F] mb-6 text-center">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card 
                    key={index}
                    className={`shadow-lg border-0 transition-all duration-300 ${info.action ? 'hover:shadow-xl cursor-pointer transform hover:-translate-y-1' : ''}`}
                    onClick={info.action || undefined}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {info.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2A2A6F]">{info.title}</h4>
                          <p className="text-gray-600">{info.details}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-[#5353AB] to-[#362F6F] text-white">
              <CardContent className="p-8 text-center">
                <h4 className="text-xl font-bold mb-4">Need Immediate Assistance?</h4>
                <p className="mb-6 opacity-90">
                  Get instant quotes and support through WhatsApp
                </p>
                <Button 
                  className="bg-white text-[#2A2A6F] hover:bg-[#DEDDF5] font-semibold px-8 py-3"
                  onClick={() => window.open('https://wa.me/917397248359?text=Hi%2C%20I%20need%20immediate%20assistance%20from%20HKS%20Provisions', '_blank')}
                >
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
