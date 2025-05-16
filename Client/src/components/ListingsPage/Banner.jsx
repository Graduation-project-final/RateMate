import React from "react";
import { useParams } from "react-router-dom";
import RR1 from "../../assets/images/RR1.webp";
import RR2 from "../../assets/images/RR2.webp";
import RR3 from "../../assets/images/RR3.webp";
import RR4 from "../../assets/images/RR4.webp";

const categoryImages = {
  Restaurants: RR1,
  Services: RR2,
  AutoServices: RR3,
  default: RR4,
};

const Banner = () => {
  const { category } = useParams();
  const imageUrl = categoryImages[category] || categoryImages.default;

  return (
    <div className="relative mb-8 rounded-lg overflow-hidden shadow-lg">
      <img
        src={imageUrl}
        alt="Banner"
        className="w-full h-[30rem] rounded-lg"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black flex items-center justify-center p-4">
        <h2 className="bg-black bg-opacity-50 text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center p-2 rounded-lg">
          {category} Specials
        </h2>
      </div>
    </div>
  );
};

export default Banner;
