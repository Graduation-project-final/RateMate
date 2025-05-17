import React from "react";
import { Link } from "react-router-dom";
import Sofa from "../../assets/images/sofa-removebg-preview.png";
import Restaurant from "../../assets/images/rest.avif.png";
import Electronics from "../../assets/images/Electronics.jpg.png";
import Apparel from "../../assets/images/Apparel.jpg.png";
import Household from "../../assets/images/Household.jpg.png";
import Health from "../../assets/images/Health & Wellness.jpg.png";
import Luxury from "../../assets/images/LOislam.png";

const CategoryCard = ({
  title,
  category,
  image,
  cta,
  bgColor,
  Color,
  alignImage,
  imageSize = "medium",
  imageAlignment = "center",
  cardIndex,
}) => {
  // Determine if this is a featured card (larger cards that were previously spanning 2 columns)
  const isFeatured = cardIndex === 1 || cardIndex === 6;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-xl ${
        isFeatured ? "h-72" : "h-60"
      }`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10"></div>

      {/* Image as background */}
      <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Category badge */}
      <div className="absolute top-4 left-4 z-20">
        <span
          className={`inline-block py-1 px-3 rounded-full text-xs font-medium bg-white bg-opacity-30 backdrop-blur-sm text-white`}
        >
          {category}
        </span>
      </div>

      {/* Content container - positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300 group-hover:translate-y-0">
        <h3 className={`text-2xl font-bold text-white mb-2`}>{title}</h3>

        {cta && (
          <div className="transform transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
            <Link to="/category/list">
              <button
                className={`mt-2 py-2 px-6 rounded-full bg-white text-gray-900 font-medium shadow-lg hover:bg-opacity-90 transition-all duration-300`}
              >
                {cta}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const CategorySection = () => {
  return (
    <>
      <div className="pt-[1rem] mt-4 px-4 sm:px-8 lg:pt-16 xl:px-40">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
          <h2 className="text-lg sm:text-xl mr-4 font-semibold text-[#060640]">
            Top Category
          </h2>
          <Link
            to="category/list"
            className="flex items-center text-gray-600 hover:underline mt-4 sm:mt-0"
          >
            <span className="mr-2 text-[#515161]">See all resources</span>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <hr className="my-4 border-[#FADED9] border-[2px]" />
      </div>
      <div className=" py-10 px-32">
        <div className="container mx-auto px-4">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* First row */}
            <div className="lg:col-span-2">
              <CategoryCard
                title="Restaurants"
                category="Dining & Food"
                image={Restaurant}
                cta="Show More"
                bgColor="bg-[#eeeeee]"
                Color="text-[#646464]"
                alignImage="flex justify-end"
                imageSize="large"
                imageAlignment="right"
                cardIndex={1}
              />
            </div>

            <div>
              <CategoryCard
                title="Electronics"
                category="Gadgets & Devices"
                image={Electronics}
                bgColor="bg-[#d4edf8]"
                Color="text-[#3a8fb6]"
                alignImage="flex justify-center"
                imageSize="medium"
                cardIndex={2}
              />
            </div>

            <div>
              <CategoryCard
                title="Apparel"
                category="Clothing & Fashion"
                image={Apparel}
                bgColor="bg-[#fef9c4]"
                Color="text-[#e4cd4c]"
                alignImage="flex justify-center"
                imageSize="medium"
                cardIndex={3}
              />
            </div>

            {/* Second row */}
            <div>
              <CategoryCard
                title="Home Appliances"
                category="Household Items"
                image={Household}
                bgColor="bg-[#f2e7e3]"
                Color="text-[#e5d3c0]"
                alignImage="flex justify-center"
                imageSize="medium"
                cardIndex={4}
              />
            </div>

            <div>
              <CategoryCard
                title="Fitness Gear"
                category="Health & Wellness"
                image={Health}
                bgColor="bg-[#e3f2e6]"
                Color="text-[#79df7e]"
                alignImage="flex justify-center"
                imageSize="medium"
                cardIndex={5}
              />
            </div>

            <div className="lg:col-span-2">
              <CategoryCard
                title="Luxury Goods"
                category="High-End Products"
                image={Luxury}
                cta="Show More"
                bgColor="bg-[#fae8e8]"
                Color="text-[#de8a8d]"
                alignImage="flex justify-end"
                imageSize="large"
                imageAlignment="right"
                cardIndex={6}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySection;
