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
  const imageClass = `${
    imageSize === "large" ? "scale-110 lg:mt-[-16]" : "scale-100"
  } ${
    cardIndex === 1 || cardIndex === 6
      ? "absolute right-0 h-full w-1/2 object-cover"
      : "flex justify-center items-center"
  }`;

  return (
    <div
      className={`relative p-4 rounded-lg shadow-md ${bgColor} flex flex-col h-[19rem] ${
        cardIndex === 1 || cardIndex === 6 ? "lg:flex-row" : ""
      }`}
    >
      <div className="flex-1">
        <div className="text-sm text-gray-500 ">{category}</div>
        <div className={`text-2xl font-bold ${Color}`}>{title}</div>
        {cta && (
          <Link to="/category/list">
            <button className="mt-4 py-2 px-4 bg-[#060640] hover:opacity-90 w-36 text-white rounded-3xl">
              {cta}
            </button>
          </Link>
        )}
      </div>
      <div
        className={`relative flex-1 ${
          cardIndex === 1 || cardIndex === 6
            ? "flex justify-end items-center"
            : alignImage
        }`}
      >
        <img
          src={image}
          alt={title}
          className={`object-cover rounded-lg ${imageClass}`}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

const CategorySectoin = () => {
  return (
    <>
      <div className="pt-[50rem] mt-16 px-4 sm:px-8 lg:pt-16 xl:px-40">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
          <h2 className="text-lg sm:text-xl mr-4 font-semibold text-[#060640]">
            Top Categories
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-10 lg:px-40 mt-10">
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
            imageSize="large" // Larger image
            imageAlignment="right" // Align image to the right
            cardIndex={1} // First card
          />
        </div>
        <CategoryCard
          title="Electronics"
          category="Gadgets & Devices"
          image={Electronics}
          bgColor="bg-[#d4edf8]"
          Color="text-[#3a8fb6]"
          alignImage="flex justify-center"
          imageSize="medium" // Default size
          cardIndex={2} // Second card
        />
        <CategoryCard
          title="Apparel"
          category="Clothing & Fashion"
          image={Apparel}
          bgColor="bg-[#fef9c4]"
          Color="text-[#e4cd4c]"
          alignImage="flex justify-center"
          imageSize="medium" // Default size
          cardIndex={3} // Third card
        />

        {/* Second row */}
        <CategoryCard
          title="Home Appliances"
          category="Household Items"
          image={Household}
          bgColor="bg-[#f2e7e3]"
          Color="text-[#e5d3c0]"
          alignImage="flex justify-center"
          imageSize="medium" // Default size
          cardIndex={4} // Fourth card
        />
        <CategoryCard
          title="Fitness Gear"
          category="Health & Wellness"
          image={Health}
          bgColor="bg-[#e3f2e6]"
          Color="text-[#79df7e]"
          alignImage="flex justify-center"
          imageSize="medium" // Default size
          cardIndex={5} // Fifth card
        />
        <div className="lg:col-span-2">
          <CategoryCard
            title="Luxury Goods"
            category="High-End Products"
            image={Luxury}
            cta="Show More"
            bgColor="bg-[#fae8e8]"
            Color="text-[#de8a8d]"
            alignImage="flex justify-end"
            imageSize="large" // Larger image
            imageAlignment="right" // Align image to the right
            cardIndex={6} // Sixth card
          />
        </div>
      </div>
    </>
  );
};

export default CategorySectoin;
