import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({
  title,
  image,
  color,
  textColor = "text-white",
  size = "col-span-1",
}) => (
  <div
    className={`${size} relative overflow-hidden rounded-xl ${color} ${textColor} transition-transform duration-300 hover:shadow-2xl hover:-translate-y-3 group`}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-[#060640] to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-50"></div>
    <div className="p-6 h-full flex flex-col justify-between relative z-10">
      <div>
        <p className="text-sm font-medium mb-2">Explore Our</p>
        <h2 className="text-4xl font-extrabold mb-4 tracking-wide">{title}</h2>
        <Link to="/shop">
          <button className="bg-[#060640] text-white font-semibold py-2 px-5 rounded-full hover:bg-[#faded9] hover:text-[#060640] transition-colors duration-300">
            Browse
          </button>
        </Link>
      </div>
    </div>
    <img
      src={image}
      alt={title}
      className="absolute bottom-6 right-6 w-1/4 h-auto object-cover transition-transform duration-500 transform group-hover:scale-110 group-hover:rotate-6"
    />
  </div>
);

const ProductCategories = () => {
  const categories = [
    {
      title: "Our Products",
      image: "./src/assets/images/logo2.png",
      color: "bg-[#fae8e8]",
      size: "col-span-1",
    },
    {
      title: "Mobile Covers",
      image: "./src/assets/images/cover-unscreen.gif",
      color: "bg-[#e3f2e6]",
      textColor: "text-black",
      size: "col-span-1",
    },
    {
      title: "Mugs",
      image: "./src/assets/images/m1-unscreen.gif",
      color: "bg-[#fef9c4]",
      size: "col-span-1",
    },
    {
      title: "Explore RateMateSHOP",
      image: "./src/assets/images/rating-unscreen.gif",
      color: "bg-[#d4edf8]",
      textColor: "text-black",
      size: "col-span-2",
    },
    {
      title: "T-Shirts",
      image: "./src/assets/images/T-shirt-unscreen.gif",
      color: "bg-[#f2e7e3]",
      size: "col-span-1",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
