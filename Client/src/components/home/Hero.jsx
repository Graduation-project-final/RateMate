import React from "react";
import BgHero from "../../assets/images/Rectangle .png";
import HeroImag from "../../assets/images/reviews-concept-landing-page.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-yellow-300 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-pink-500 blur-3xl"></div>
      </div>

      {/* Hidden background image for maintaining functionality */}
      <div className="hidden">
        <img src={BgHero} alt="" />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left content side */}
          <div className="lg:w-1/2 space-y-8 z-10">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-amber-200 rounded-full opacity-30"></div>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight relative">
                Discover Your City's Best Kept{" "}
                <span className="text-amber-200">Secrets</span>
              </h2>
            </div>

            <p className="text-lg text-gray-100">
              Find top-rated restaurants, shops, and experiences curated by
              locals just for you.
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <Link to="/category/list">
                <button className="px-8 py-3 bg-amber-200 text-indigo-900 font-medium rounded-full transform hover:scale-105 transition-transform duration-300 shadow-lg">
                  Start Reviewing
                </button>
              </Link>

              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">236+</div>
                  <div className="text-amber-200 text-sm">Business today</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-amber-200 text-sm">Results rated</div>
                </div>
              </div>
            </div>

            {/* Search box */}
            <div className="relative">
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-md rounded-full p-4 pl-6 border border-white border-opacity-30">
                <span className="text-gray-100">
                  Search for places, restaurants, and more!
                </span>
                <div className="ml-auto bg-white rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right image side with decorative elements */}
          <div className="lg:w-1/2 relative z-10">
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-70 blur-sm"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full opacity-70 blur-sm"></div>

              {/* Main image in a styled container */}
              <div className="p-1 rounded-3xl">
                <div className="p-2 rounded-2xl overflow-hidden">
                  <img
                    src={HeroImag}
                    alt="City exploration illustration"
                    className="w-full h-auto rounded-xl transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
