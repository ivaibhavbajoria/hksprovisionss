
export interface ProductSpec {
  parameter: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  specifications: ProductSpec[];
  hsCode?: string;
  packaging: string[];
  moq: string;
  availability: string;
  tradeInfo: {
    fob?: string;
    port: string;
    leadTime: string;
    paymentTerms: string;
  };
  relatedProducts: string[];
}

export const productsData: Product[] = [
  // TEA PRODUCTS
  {
    id: "bop-assam-tea",
    name: "BOP Assam Tea",
    category: "tea",
    subcategory: "assam",
    shortDescription: "Premium Broken Orange Pekoe Assam tea with bold granules and malty flavor profile.",
    fullDescription: "Our BOP Assam Tea represents the finest quality CTC tea from the renowned tea gardens of Assam. Known for its robust flavor, bright golden brew, and distinctive malty aroma, this tea is perfect for both domestic consumption and export markets. The bold granules ensure excellent brewing characteristics.",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { parameter: "Grade", value: "BOP" },
      { parameter: "Type", value: "Assam CTC" },
      { parameter: "Origin", value: "Assam, India" },
      { parameter: "Moisture", value: "≤ 8%" },
      { parameter: "Colour", value: "Bright golden brew" },
      { parameter: "Aroma", value: "Malty" },
      { parameter: "Appearance", value: "Bold granules" },
      { parameter: "Caffeine", value: "Medium" },
      { parameter: "Shelf Life", value: "12 Months" }
    ],
    hsCode: "0902.30.00",
    packaging: ["25kg PP Bags", "50kg Jute Bags", "Custom Packaging"],
    moq: "1 MT",
    availability: "In Stock",
    tradeInfo: {
      port: "Kolkata",
      leadTime: "5-10 days",
      paymentTerms: "TT 30% advance, 70% against scanned documents"
    },
    relatedProducts: ["bopsm-assam-tea", "bopl-assam-tea", "dust-assam-tea"]
  },
  {
    id: "bopsm-assam-tea",
    name: "BOPSM Assam Tea",
    category: "tea",
    subcategory: "assam",
    shortDescription: "Broken Orange Pekoe Small Medium grade Assam tea with excellent brewing strength.",
    fullDescription: "BOPSM Assam Tea offers the perfect balance of flavor and strength. This medium-sized leaf grade provides excellent brewing characteristics with a rich, full-bodied taste that tea connoisseurs appreciate. Ideal for both milk tea preparations and black tea consumption.",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { parameter: "Grade", value: "BOPSM" },
      { parameter: "Type", value: "Assam CTC" },
      { parameter: "Origin", value: "Assam, India" },
      { parameter: "Moisture", value: "≤ 8%" },
      { parameter: "Colour", value: "Rich amber" },
      { parameter: "Aroma", value: "Strong malty" },
      { parameter: "Particle Size", value: "Small-Medium" }
    ],
    hsCode: "0902.30.00",
    packaging: ["25kg PP Bags", "50kg Jute Bags"],
    moq: "1 MT",
    availability: "In Stock",
    tradeInfo: {
      port: "Kolkata",
      leadTime: "5-10 days",
      paymentTerms: "TT 30% advance, 70% against scanned documents"
    },
    relatedProducts: ["bop-assam-tea", "bopl-assam-tea", "dust-assam-tea"]
  },
  // RICE PRODUCTS
  {
    id: "1121-basmati-rice",
    name: "1121 Basmati Rice",
    category: "rice",
    subcategory: "basmati",
    shortDescription: "Premium long-grain 1121 Basmati rice with exceptional aroma and taste.",
    fullDescription: "Our 1121 Basmati Rice is sourced from the foothills of the Himalayas, known for its extra-long grains, distinctive aroma, and fluffy texture when cooked. This premium variety is aged to perfection and meets international quality standards for export markets.",
    images: [
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { parameter: "Variety", value: "1121 Basmati" },
      { parameter: "Length", value: "8.30mm (min)" },
      { parameter: "Moisture", value: "≤ 12%" },
      { parameter: "Broken", value: "≤ 2%" },
      { parameter: "Foreign Matter", value: "≤ 0.1%" },
      { parameter: "Aging", value: "12+ Months" },
      { parameter: "Aroma", value: "Natural Basmati" }
    ],
    hsCode: "1006.30.10",
    packaging: ["25kg PP Bags", "50kg Jute Bags", "1kg Consumer Packs"],
    moq: "1 Container (25 MT)",
    availability: "In Stock",
    tradeInfo: {
      port: "Mundra/Nhava Sheva",
      leadTime: "7-15 days",
      paymentTerms: "LC at sight or TT 30% advance"
    },
    relatedProducts: ["traditional-basmati-rice", "sona-masoori-rice"]
  },
  {
    id: "sona-masoori-rice",
    name: "Sona Masoori Rice",
    category: "rice",
    subcategory: "non-basmati",
    shortDescription: "Premium non-basmati rice variety known for its light weight and aromatic flavor.",
    fullDescription: "Sona Masoori is a premium variety of rice grown mainly in Andhra Pradesh and Karnataka. This medium-grain rice is lightweight, aromatic, and cooks perfectly without breaking. It's ideal for daily consumption and is highly preferred in South Indian cuisine.",
    images: [
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { parameter: "Variety", value: "Sona Masoori" },
      { parameter: "Length", value: "5.0-5.5mm" },
      { parameter: "Moisture", value: "≤ 14%" },
      { parameter: "Broken", value: "≤ 5%" },
      { parameter: "Foreign Matter", value: "≤ 0.1%" },
      { parameter: "Type", value: "Non-Basmati" }
    ],
    hsCode: "1006.30.90",
    packaging: ["25kg PP Bags", "50kg Jute Bags"],
    moq: "1 Container (25 MT)",
    availability: "In Stock",
    tradeInfo: {
      port: "Chennai/Visakhapatnam",
      leadTime: "7-12 days",
      paymentTerms: "LC at sight or TT 30% advance"
    },
    relatedProducts: ["1121-basmati-rice", "ir64-rice"]
  },
  // SPICES
  {
    id: "salem-turmeric",
    name: "Salem Turmeric",
    category: "spices",
    subcategory: "turmeric",
    shortDescription: "Premium Salem turmeric with high curcumin content and bright yellow color.",
    fullDescription: "Salem Turmeric is renowned for its high curcumin content, bright yellow color, and superior quality. Grown in the Salem district of Tamil Nadu, this variety is considered among the finest turmeric available globally, perfect for both culinary and medicinal applications.",
    images: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { parameter: "Origin", value: "Salem, Tamil Nadu" },
      { parameter: "Curcumin", value: "6-8%" },
      { parameter: "Moisture", value: "≤ 10%" },
      { parameter: "Color", value: "Bright Yellow" },
      { parameter: "Form", value: "Whole/Powder" },
      { parameter: "Purity", value: "99%" }
    ],
    hsCode: "0910.10.00",
    packaging: ["25kg PP Bags", "50kg Jute Bags", "Custom Packaging"],
    moq: "1 MT",
    availability: "In Stock",
    tradeInfo: {
      port: "Chennai/Tuticorin",
      leadTime: "5-10 days",
      paymentTerms: "TT 30% advance, 70% against documents"
    },
    relatedProducts: ["alleppey-turmeric", "guntur-chilli"]
  },
  // WHEAT
  {
    id: "sharbati-wheat",
    name: "Sharbati Wheat",
    category: "wheat",
    shortDescription: "Premium Sharbati wheat variety known for its golden color and excellent milling quality.",
    fullDescription: "Sharbati Wheat is a premium variety grown primarily in Madhya Pradesh. Known for its golden color, high protein content, and excellent milling quality, it produces superior quality flour ideal for making chapatis, breads, and other wheat-based products.",
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { parameter: "Variety", value: "Sharbati" },
      { parameter: "Protein", value: "11-13%" },
      { parameter: "Moisture", value: "≤ 12%" },
      { parameter: "Foreign Matter", value: "≤ 2%" },
      { parameter: "Test Weight", value: "78-80 kg/hl" },
      { parameter: "Gluten", value: "Good Quality" }
    ],
    hsCode: "1001.99.10",
    packaging: ["50kg PP Bags", "Custom Packaging"],
    moq: "1 Container (25 MT)",
    availability: "In Stock",
    tradeInfo: {
      port: "Mundra/JNPT",
      leadTime: "10-15 days",
      paymentTerms: "LC at sight or TT 30% advance"
    },
    relatedProducts: ["lokwan-wheat", "mp-grade-wheat"]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return productsData.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return productsData.filter(product => product.category === category);
};

export const getProductsBySubcategory = (category: string, subcategory: string): Product[] => {
  return productsData.filter(product => 
    product.category === category && product.subcategory === subcategory
  );
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return productsData.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.shortDescription.toLowerCase().includes(lowercaseQuery)
  );
};
