import React from "react";
import ProductGrid from "../components/shop/ProductGrid";
import HeaderSection from "../components/EC/HeaderSection";
import { CartProvider } from "../hooks/CartContext";

function App3() {
  return (
    <>
      <CartProvider>
        <HeaderSection />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <h1 className="text-3xl font-bold mb-6">Mobile Planet</h1>

          <ProductGrid />
        </div>
      </CartProvider>
    </>
  );
}

export default App3;
