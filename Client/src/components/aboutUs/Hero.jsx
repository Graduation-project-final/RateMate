// Hero.jsx
import { useState, useEffect } from "react";
import "./Hero.css"; // We'll create a new Hero.css

const Hero = () => {
  const images = [
    "./src/assets/images/rest.jpg",
    "./src/assets/images/home.jpg",
    "./src/assets/images/auto.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero-container">
      <div className="hero-image">
        <img
          src={images[currentImageIndex]}
          alt="Slideshow"
          className="hero-img"
        />
        <div className="gradient-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="glass-box">
          <h1>
            Get to Know <span>RateMate</span>
          </h1>
          <p>
            Discover the journey, the passion, and the innovation behind
            RateMate.
          </p>
          <button>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
