import { useState, useEffect } from "react";
import "./Styling.css"; // Ensure you have appropriate styles

const Hero = () => {
  const images = [
    "./src/assets/images/rest.jpg", // Replace with your image paths
    "./src/assets/images/home.jpg",
    "./src/assets/images/auto.jpg",
    // Add more images as needed
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000); // Change image every 1 second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={images[currentImageIndex]}
          alt="Background"
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        />
      </div>
      <div className="relative flex justify-center items-center w-full h-full bg-black bg-opacity-60">
        <div className="text-center">
          <h1 className="text-7xl font-bold font-serif text-white mb-4">
            About <span className="text-[#FADED9]">RateMate</span>
          </h1>
          <p className="text-lg text-white opacity-80 mb-8">
            Discover the journey, the passion, and the innovation behind
            RateMate.
          </p>
          <button className="px-6 py-3 bg-[#FADED9] text-[#060640] font-semibold rounded-lg shadow-lg transform transition-transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
