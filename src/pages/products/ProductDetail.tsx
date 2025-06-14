
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, ChevronUp, Package, Truck, Globe, Shield, Clock, ArrowRight } from 'lucide-react';
import { productsData, getProductById, getProductsByCategory } from '@/data/products';

const ProductDetail = () => {
  const { category, subcategory, product: productSlug } = useParams();
  const navigate = useNavigate();
  const [showTradeInfo, setShowTradeInfo] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find the product based on URL parameters
  const product = productSlug 
    ? getProductById(productSlug)
    : productsData.find(p => p.category === category && (!subcategory || p.subcategory === subcategory));

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/')} className="bg-[#5353AB] hover:bg-[#2A2A6F]">
            Return Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const whatsappText = `Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(product.name)}.%20Please%20share%20the%20latest%20quote.`;
  const whatsappUrl = `https://wa.me/917397248359?text=${whatsappText}`;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2A2A6F] via-[#5353AB] to-[#362F6F] text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb className="mb-6">
            <BreadcrumbList className="text-white/80">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-white">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbLink href="#products" className="hover:text-white">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/products/${product.category}`} className="hover:text-white">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {product.subcategory && (
                <>
                  <BreadcrumbSeparator className="text-white/60" />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/products/${product.category}/${product.subcategory}`} className="hover:text-white">
                      {product.subcategory.charAt(0).toUpperCase() + product.subcategory.slice(1)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl opacity-90 max-w-3xl">{product.shortDescription}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg bg-[#DEDDF5]">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-[#5353AB]' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-[#2A2A6F] mb-4">{product.name}</h2>
                <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#DEDDF5] p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Package className="w-5 h-5 text-[#5353AB] mr-2" />
                    <span className="font-semibold text-[#2A2A6F]">MOQ</span>
                  </div>
                  <p className="text-gray-700">{product.moq}</p>
                </div>
                <div className="bg-[#DEDDF5] p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Shield className="w-5 h-5 text-[#5353AB] mr-2" />
                    <span className="font-semibold text-[#2A2A6F]">Availability</span>
                  </div>
                  <p className="text-gray-700">{product.availability}</p>
                </div>
              </div>

              {/* Packaging Options */}
              <div>
                <h3 className="font-semibold text-[#2A2A6F] mb-3">Packaging Options</h3>
                <div className="flex flex-wrap gap-2">
                  {product.packaging.map((pack, index) => (
                    <Badge key={index} variant="outline" className="border-[#5353AB] text-[#5353AB]">
                      {pack}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="flex-1 bg-[#5353AB] hover:bg-[#2A2A6F] text-white py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                  onClick={() => window.open(whatsappUrl, '_blank')}
                >
                  Get Latest Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-[#5353AB] text-[#5353AB] hover:bg-[#5353AB] hover:text-white py-3 px-6"
                  onClick={() => document.getElementById('specifications')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Specifications
                </Button>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <div id="specifications">
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#DEDDF5]">
                <TabsTrigger value="specifications" className="data-[state=active]:bg-[#5353AB] data-[state=active]:text-white">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="trade-info" className="data-[state=active]:bg-[#5353AB] data-[state=active]:text-white">
                  Trade Information
                </TabsTrigger>
                <TabsTrigger value="packaging" className="data-[state=active]:bg-[#5353AB] data-[state=active]:text-white">
                  Packaging & Logistics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-[#2A2A6F]">Parameter</TableHead>
                          <TableHead className="text-[#2A2A6F]">Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {product.specifications.map((spec, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{spec.parameter}</TableCell>
                            <TableCell>{spec.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trade-info" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Globe className="w-5 h-5 text-[#5353AB] mr-3 mt-1" />
                          <div>
                            <h4 className="font-semibold text-[#2A2A6F]">Port of Export</h4>
                            <p className="text-gray-600">{product.tradeInfo.port}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Clock className="w-5 h-5 text-[#5353AB] mr-3 mt-1" />
                          <div>
                            <h4 className="font-semibold text-[#2A2A6F]">Lead Time</h4>
                            <p className="text-gray-600">{product.tradeInfo.leadTime}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {product.hsCode && (
                          <div>
                            <h4 className="font-semibold text-[#2A2A6F]">HS Code</h4>
                            <p className="text-gray-600">{product.hsCode}</p>
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-[#2A2A6F]">Payment Terms</h4>
                          <p className="text-gray-600">{product.tradeInfo.paymentTerms}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="packaging" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-[#2A2A6F] mb-3">Available Packaging</h4>
                        <ul className="space-y-2">
                          {product.packaging.map((pack, index) => (
                            <li key={index} className="flex items-center">
                              <Package className="w-4 h-4 text-[#5353AB] mr-2" />
                              <span>{pack}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#2A2A6F] mb-3">Logistics Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Truck className="w-4 h-4 text-[#5353AB] mr-2" />
                            <span>Container Loading: 20ft & 40ft available</span>
                          </div>
                          <div className="flex items-center">
                            <Shield className="w-4 h-4 text-[#5353AB] mr-2" />
                            <span>Quality Certificate provided</span>
                          </div>
                          <div className="flex items-center">
                            <Globe className="w-4 h-4 text-[#5353AB] mr-2" />
                            <span>FOB/CIF terms available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h3 className="text-2xl font-bold text-[#2A2A6F] mb-8 text-center">Related Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <img 
                        src={relatedProduct.images[0]} 
                        alt={relatedProduct.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-semibold text-[#2A2A6F] mb-2">{relatedProduct.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{relatedProduct.shortDescription.slice(0, 80)}...</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full border-[#5353AB] text-[#5353AB] hover:bg-[#5353AB] hover:text-white"
                        onClick={() => navigate(`/products/${relatedProduct.category}/${relatedProduct.subcategory || 'general'}/${relatedProduct.id}`)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          className="bg-[#5353AB] hover:bg-[#2A2A6F] text-white px-6 py-3 rounded-full shadow-lg transition-all transform hover:scale-105"
          onClick={() => window.open(whatsappUrl, '_blank')}
        >
          Get Quote
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
