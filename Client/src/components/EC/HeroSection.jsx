import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Welcome to RateMateSHOP",
    subtitle: "Apparel",
    mainText: "Premium T-Shirts",
    buttonText: "Shop by Category",
    image: "./src/assets/images/welcome.gif",
  },
  {
    title: "RateMate Signature Mug",
    subtitle: "Drinkware",
    mainText: "Elegant Coffee Mug",
    buttonText: "Explore Now",
    image: "./src/assets/images/mug.gif",
  },
  {
    title: "Our Brand Commitment",
    subtitle: "Exceptional Products",
    mainText: "Your Preferred Choice",
    buttonText: "Discover More",
    image: "./src/assets/images/Logo.png",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative overflow-hidden h-screen">
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: "linear-gradient(to right, #060640, #515161, #FADED9)",
          backgroundSize: "400% 400%",
        }}
        animate={{ backgroundPosition: "200% center" }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <motion.div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div
        className="flex justify-between items-center transition-transform duration-1000"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-none w-full flex justify-between items-center px-20"
          >
            <motion.div
              className="max-w-xl z-10"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg animate-fadeIn">
                {slide.title}
              </h2>
              <h1
                className="text-7xl font-extrabold text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #b7cdf5, #281669)",
                }}
              >
                {slide.subtitle}
              </h1>
              <h1 className="text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
                {slide.mainText}
              </h1>
              <Link to="/shop">
                <button
                  className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-white px-8 py-4 rounded-full font-semibold transition-transform transform hover:scale-105 hover:bg-opacity-30"
                  style={{
                    background: "linear-gradient(to right, #060640, #FADED9)",
                    borderColor: "#515161",
                  }}
                >
                  {slide.buttonText}
                </button>
              </Link>
            </motion.div>
            <motion.img
              src={slide.image}
              alt={slide.title}
              className="w-1/2 lg:w-1/3 object-cover rounded-xl shadow-2xl transition-opacity duration-500 z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        ))}
      </div>
      <button
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 p-4 rounded-full shadow-lg hover:bg-opacity-50 transition-colors z-20"
        onClick={prevSlide}
        style={{ backgroundColor: "#515161", color: "#FADED9" }}
      >
        &lt;
      </button>
      <button
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 p-4 rounded-full shadow-lg hover:bg-opacity-50 transition-colors z-20"
        onClick={nextSlide}
        style={{ backgroundColor: "#515161", color: "#FADED9" }}
      >
        &gt;
      </button>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer ${
              index === currentSlide ? "bg-[#060640]" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
