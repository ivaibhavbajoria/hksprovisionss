
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Tea from "./pages/products/Tea";
import Rice from "./pages/products/Rice";
import Wheat from "./pages/products/Wheat";
import Spices from "./pages/products/Spices";
import DryFruits from "./pages/products/DryFruits";
import ProductDetail from "./pages/products/ProductDetail";
import { SecurityUtils, setupGlobalErrorHandling } from "./utils/security";
import { initializeProduction } from "./config/production";
import SecurityWrapper from "./components/SecurityWrapper";
import { AnimationUtils } from "./utils/animations";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  useEffect(() => {
    // Initialize security measures
    setupGlobalErrorHandling();
    initializeProduction();
    
    // Set CSP headers if in production
    if (SecurityUtils.isProduction()) {
      SecurityUtils.setCSPHeaders();
    }
    
    // Initialize animations
    AnimationUtils.addHoverEffects();
    
    // Log environment info
    console.log('App initialized:', {
      isProduction: SecurityUtils.isProduction(),
      isSecure: SecurityUtils.isSecureConnection(),
      timestamp: new Date().toISOString()
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SecurityWrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products/tea" element={<Tea />} />
              <Route path="/products/rice" element={<Rice />} />
              <Route path="/products/wheat" element={<Wheat />} />
              <Route path="/products/spices" element={<Spices />} />
              <Route path="/products/dry-fruits" element={<DryFruits />} />
              <Route path="/products/:category/:subcategory/:product" element={<ProductDetail />} />
              <Route path="/products/:category/:product" element={<ProductDetail />} />
              <Route path="/products/:category" element={<ProductDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SecurityWrapper>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
