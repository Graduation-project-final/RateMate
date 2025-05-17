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
    <section className="bg-gradient-to-br from-[#060640] via-[#1a1a4e] to-[#060640] text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Info Panel */}
        <div data-aos="fade-up" className="space-y-6">
          <h4 className="text-sm font-semibold tracking-widest text-[#FADED9]">
            ABOUT US
          </h4>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            The Story Behind <span className="text-[#FADED9]">RateMate</span>
          </h1>
          <p className="text-gray-200 leading-relaxed">
            Welcome to RateMate, your go-to platform for insightful ratings and
            reviews in Jordan. At RateMate, we are dedicated to helping you make
            informed decisions by providing comprehensive and reliable ratings
            for various services and products.
          </p>
          <p className="text-gray-200 leading-relaxed">
            Our mission is to offer a transparent and user-friendly platform
            where you can share and explore honest feedback on your favorite
            places and experiences.
          </p>
          <Link
            to="/review"
            className="inline-block bg-[#FADED9] text-[#060640] px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-transparent hover:text-[#FADED9] border-2 border-[#FADED9]"
          >
            Explore Ratings Now
          </Link>
        </div>

        {/* Right Feature Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          data-aos="fade-left"
        >
          {/* Top-Rated */}
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <Icon path={mdiStar} size={2} color="#FADED9" />
            </div>
            <h3 className="text-xl font-bold mb-2">Top-Rated Spots</h3>
            <p className="text-sm text-gray-300 mb-4">
              Discover the highest-rated places and services in Jordan,
              handpicked by our community.
            </p>
            <img
              src="./src/assets/images/home.jpg"
              alt="Top-rated"
              className="w-full rounded-lg shadow-md"
            />
          </div>

          {/* Exclusive Reviews */}
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow duration-300">
            <img
              src="./src/assets/images/rest.jpg"
              alt="Exclusive reviews"
              className="w-full mb-4 rounded-lg shadow-md"
            />
            <div className="flex justify-center mb-4">
              <Icon path={mdiStarCircleOutline} size={2} color="#FADED9" />
            </div>
            <h3 className="text-xl font-bold mb-2">Exclusive Reviews</h3>
            <p className="text-sm text-gray-300">
              Explore exclusive reviews and insights on the best places to visit
              and the top services to use, all rated by real users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
