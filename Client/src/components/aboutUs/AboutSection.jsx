import React, { useEffect } from "react";
import Icon from "@mdi/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { mdiStarCircleOutline, mdiStar } from "@mdi/js";
import { Link } from "react-router-dom";

const AboutSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="py-16 px-6 lg:px-0">
      <div className="flex flex-col-reverse lg:flex-row-reverse lg:w-4/5 sm:w-full mx-auto space-y-10 lg:space-y-0 lg:space-x-10">
        {/* Left Section */}
        <div className="lg:w-1/2 md:w-full ml-5 mt-1" data-aos="fade-left">
          <h5 className="text-lg font-bold text-gray-600">ABOUT US</h5>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-4">
            RateMate - Rating Platform
          </h1>
          <p className="text-gray-600 mt-6 leading-relaxed">
            Welcome to RateMate, your go-to platform for insightful ratings and
            reviews in Jordan. At RateMate, we are dedicated to helping you make
            informed decisions by providing comprehensive and reliable ratings
            for various services and products. Our mission is to offer a
            transparent and user-friendly platform where you can share and
            explore honest feedback on your favorite places and experiences.
          </p>
          <Link
            to={"/review"}
            className="inline-block px-6 py-3 border-2 border-[#060640] text-white font-medium text-sm uppercase rounded-lg mt-6 bg-[#060640] hover:bg-transparent hover:text-[#060640] focus:outline-none transition duration-300 ease-in-out"
          >
            Explore Ratings Now
          </Link>
        </div>

        {/* Right Section */}
        <div
          className="lg:w-1/2 flex flex-col md:flex-row justify-center lg:justify-between items-center space-y-10 lg:space-y-0"
          data-aos="fade-right"
        >
          {/* Top-Rated Spots */}
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center">
            <div className="mb-4">
              <Icon path={mdiStar} className="text-[#060640]" size={2} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Top-Rated Spots
            </h3>
            <p className="text-gray-600">
              Discover the highest-rated places and services in Jordan,
              handpicked by our community of reviewers.
            </p>
            <img
              src="./src/assets/images/home.jpg"
              alt="Top-rated places"
              className="mt-6 w-3/4 rounded-lg shadow-md"
            />
          </div>

          {/* Exclusive Reviews */}
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center">
            <img
              src="./src/assets/images/rest.jpg"
              alt="Exclusive reviews"
              className="mb-6 w-3/4 rounded-lg shadow-md"
            />
            <div className="mb-4">
              <Icon
                path={mdiStarCircleOutline}
                className="text-[#060640]"
                size={2}
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Exclusive Reviews
            </h3>
            <p className="text-gray-600">
              Explore exclusive reviews and insights on the best places to visit
              and the top services to use, all rated by real users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
