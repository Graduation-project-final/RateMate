import React, { useState } from "react";
import BgHero from "../../assets/images/Rectangle .png";
import HeroImag from "../../assets/images/reviews-concept-landing-page.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="relative flex justify-center mt-5 z-[-30] ">
        <img src={BgHero} alt="" className="hidden lg:block" />
      </div>
      <div className="absolute w-full p-5 top-[-40px] flex flex-col lg:flex-row lg:items-center lg:p-[6rem] lg:justify-around">
        <div className="order-2 lg:order-1">
          <h3 className="text-left text-2xl font-bold text-[#060640] lg:text-white tracking-[0.25rem] w-full lg:w-[600px] pl-0 lg:pl-28">
            Discover Your City's Best Kept{" "}
            <span className="text-[#FADED9]">Secrets</span> Find top-rated
            restaurants, shops, and experiences curated by locals just for you.
          </h3>
          <div className="flex justify-around mt-5 lg:mt-10 lg:pl-20 items-center">
            <Link to="/category/list">
              <button className="w-[150px] h-[35px] bg-[#FADED9] rounded-xl hover:opacity-80">
                Start Reviewing
              </button>
            </Link>
            <div className="flex flex-col items-center mx-2">
              <p className="font-serif lg:text-white text-[#060640] font-semibold text-2xl leading-7">
                236+
              </p>
              <p className="font-bitter font-normal text-xs leading-3 text-[#FADED9]">
                Business today
              </p>
            </div>
            <div className="flex flex-col items-center mx-2">
              <p className="font-serif lg:text-white text-[#060640] font-semibold text-2xl leading-7">
                98%
              </p>
              <p className="font-bitter font-normal text-xs leading-3 text-[#FADED9]">
                Results rated
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 text-center lg:text-right mb-5 lg:mb-0">
          <img
            src={HeroImag}
            alt="Description"
            className="h-[400px] w-[300px] mt-12 lg:h-[513px] lg:w-[600px] mx-auto lg:mx-0 lg:mt-10 lg:pr-14"
          />
        </div>
      </div>

      {/* Search box replacement */}
      <div className="flex flex-col mt-[30rem] lg:mt-0 lg:flex-row lg:w-[480px] lg:h-[55px] w-[350px] lg:mx-0 justify-between align-middle items-center rounded-3xl border border-[#060640] p-2 shadow-md absolute left-[200px] lg:left-[200px] top-[350px] lg:top-[505px] transform -translate-x-1/2 lg:translate-x-0">
        <div className="text-center lg:text-left w-full lg:w-auto text-[#060640] font-medium pl-20">
          Search for places, restaurants, and more!
        </div>
      </div>
    </>
  );
};

export default Hero;
