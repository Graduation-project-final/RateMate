import React from "react";
import HeroSection from "../components/EC/HeroSection";
import HeaderSection from "../components/EC/HeaderSection";
import ProductCategories from "../components/EC/ProductCategories";
import MidSection from "../components/EC/midSection";
import ProductSection from "../components/EC/ProductSection";
import OrderTracker from "../components/EC/contact";
import { CartProvider } from "../hooks/CartContext";

const App2 = () => (
  <CartProvider>
    <div className="min-h-screen bg-white">
      {/* hvkjvg */}
      <HeaderSection />
      <HeroSection />
      <ProductCategories />
      <MidSection />
      <ProductSection />
      <OrderTracker />
    </div>
  </CartProvider>
);

export default App2;
