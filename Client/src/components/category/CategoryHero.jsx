import React from "react";
import CategoryHero11 from "../../assets/images/ZZ1.webp";

const CategoryHero = () => {
  return (
    <div className="pb-8 pt-4 px-4 lg:px-32">
      <div
        className="relative h-[500px] w-full rounded-xl"
        style={{
          backgroundImage: `url(${CategoryHero11})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="max-w-3xl p-4 isolate z-30 mt-[-2rem] mx-auto">
        <div className="shadow-lg bg-white p-4 sm:p-8 overflow-hidden rounded-2xl">
          <div className="relative z-10 flex flex-col space-y-6 text-left h-[100px]">
            <h1 className="text-4xl leading-none font-bold text-[#060640]">
              Explore Our <span className="text-[#FADED9]">Category</span>{" "}
              Reviews
            </h1>
            <h1 className="text-gray-400 text-xl max-w-2xl leading-none hidden sm:block">
              Dive into detailed reviews and ratings for Category. Our platform
              features user experiences and expert insights to help you choose
              the best options available.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
