import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialCarousel from "../components/EC-about/Testimonials";
import HeaderSection from "../components/EC/HeaderSection";

const AboutUs = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [isExploring, setIsExploring] = useState(false);

  const products = [
    {
      id: 0,
      title: "Classic Men's T-Shirt",
      category: "Men's Fashion",
      image: "./src/assets/images/(6).png",
      price: "$25.00",
      rating: "4.5/5",
    },
    {
      id: 1,
      title: "Chic Women's T-Shirt",
      category: "Women's Fashion",
      image: "./src/assets/images/(5).png",
      price: "$30.00",
      rating: "4.7/5",
    },
    {
      id: 2,
      title: "Stylish Girly T-Shirt",
      category: "Youth Fashion",
      image: "./src/assets/images/(2).png",
      price: "$20.00",
      rating: "4.3/5",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedProduct((prev) => (prev + 1) % products.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HeaderSection />
      <div className="bg-[#060640] text-white h-screen overflow-hidden relative">
        {/* Background effects */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-700 to-[#060640]">
          {/* Add some subtle background effects here if needed */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 70%)`,
            }}
          />
        </div>
        <AnimatePresence>
          {products.map(
            (prod, index) =>
              selectedProduct === index && (
                <motion.div
                  key={prod.id}
                  className="absolute inset-0 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-[#060640]"></div>
                </motion.div>
              )
          )}
        </AnimatePresence>
        <header className="absolute top-0 left-0 p-8 z-10">
          <motion.h1
            className="text-4xl font-light tracking-wider text-shadow-lg"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            RateMateSHOP
          </motion.h1>
        </header>
        <main className="relative h-full flex items-center justify-center">
          <AnimatePresence>
            {!isExploring && (
              <motion.div
                className="flex space-x-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                {products.map((prod, index) => (
                  <ProductCard
                    key={prod.id}
                    {...prod}
                    isSelected={selectedProduct === index}
                    onClick={() => setSelectedProduct(index)}
                    onExplore={() => setIsExploring(true)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isExploring && (
              <ProductDetailsView
                product={products[selectedProduct]}
                onClose={() => setIsExploring(false)}
              />
            )}
          </AnimatePresence>
        </main>
        <footer className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-center">
          <div className="flex space-x-12">
            <StatsItem
              icon="💰"
              value={products[selectedProduct].price}
              label="PRICE"
            />
            <StatsItem
              icon="⭐"
              value={products[selectedProduct].rating}
              label="RATING"
            />
          </div>
          <div className="flex space-x-4">
            {products.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  selectedProduct === index ? "bg-white" : "bg-white/50"
                }`}
                whileHover={{ scale: 1.2 }}
                onClick={() => setSelectedProduct(index)}
              />
            ))}
          </div>
        </footer>
      </div>
      <TestimonialCarousel />
    </>
  );
};

const ProductCard = ({
  title,
  category,
  image,
  isSelected,
  onClick,
  onExplore,
}) => {
  return (
    <motion.div
      className={`w-72 h-96 rounded-lg overflow-hidden cursor-pointer relative ${
        isSelected ? "border-2 border-white" : ""
      } shadow-lg transform hover:scale-105 transition-transform duration-500 ease-out`}
      whileHover={{ scale: 1.1, rotate: 2 }}
      animate={{ scale: isSelected ? 1.15 : 1, opacity: isSelected ? 1 : 0.7 }}
      onClick={onClick}
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060640] to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <h2 className="text-2xl font-bold mb-1 text-shadow-md">{title}</h2>
        <p className="text-sm opacity-75">{category}</p>
      </div>
      <motion.button
        className="absolute bottom-4 right-4 bg-gradient-to-r from-[#FADED9] to-[#515161] text-white px-4 py-2 rounded-full opacity-0 shadow-lg"
        whileHover={{ scale: 1.1 }}
        animate={{ opacity: isSelected ? 1 : 0 }}
        onClick={(e) => {
          e.stopPropagation();
          onExplore();
        }}
      >
        View Details
      </motion.button>
    </motion.div>
  );
};

const ProductDetailsView = ({ product, onClose }) => {
  return (
    <motion.div
      className="absolute inset-0 bg-[#060640]/90 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white/10 p-8 rounded-lg max-w-2xl w-full shadow-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
        <p className="mb-4">{product.category}</p>
        <p className="mb-4">
          Explore our premium {product.title}, crafted with high-quality
          materials for the best experience. Perfect for those who appreciate
          style and comfort.
        </p>
        <div className="flex justify-between mb-8">
          <p>Price: {product.price}</p>
          <p>Rating: {product.rating}</p>
        </div>
        <motion.button
          className="bg-white text-[#060640] px-6 py-2 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const StatsItem = ({ icon, value, label }) => {
  return (
    <>
      <motion.div
        className="flex items-center space-x-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <span className="text-3xl">{icon}</span>
        <div>
          <p className="text-2xl font-light">{value}</p>
          <p className="text-xs opacity-50">{label}</p>
        </div>
      </motion.div>
    </>
  );
};

export default AboutUs;
