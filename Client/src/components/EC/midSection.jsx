import React from "react";
import { Link } from "react-router-dom";

const ServiceItem = ({ icon, title, description }) => (
  <div className="flex items-center p-6 border rounded-lg shadow-lg bg-white hover:bg-red-50 transition duration-300 ease-in-out transform hover:scale-105">
    <div className="text-red-600 text-4xl mr-4">{icon}</div>
    <div className="flex-1">
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-md text-[#060640]">{description}</p>
    </div>
  </div>
);

const MidSection = () => {
  return (
    <div className="relative max-w-7xl mx-auto px-4 py-12">
      {/* Service Items */}
      <div className="flex flex-wrap justify-between mb-12 gap-6">
        <ServiceItem
          icon={<i className="fas fa-car"></i>}
          title="Free Shipping"
          description="Free Shipping On All Orders"
        />
        <ServiceItem
          icon={<i className="fas fa-check-circle"></i>}
          title="Safe Money"
          description="30 Days Money Back"
        />
        <ServiceItem
          icon={<i className="fas fa-credit-card"></i>}
          title="Secure Payment"
          description="All Payments Secured"
        />
        <ServiceItem
          icon={<i className="fas fa-headset"></i>}
          title="Online Support 24/7"
          description="Technical Support Anytime"
        />
      </div>

      {/* Promotional Section */}
      <div className="relative bg-gradient-to-br from-[#060640] to-[#FADED9] rounded-3xl p-8 flex items-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <img
            src="./src/assets/images/rate.gif"
            alt="RateMateSHOP"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060640] via-transparent to-[#060640 opacity-30"></div>
        </div>
        <div className="relative z-10 max-w-lg text-center">
          <p className="text-yellow-300 text-xl font-semibold mb-2">
            Exclusive Offer
          </p>
          <h2 className="text-6xl font-extrabold text-white mb-4 leading-tight">
            RateMateSHOP
          </h2>
          <p className="text-white text-lg mb-4">Valid from 10 Jan to 28 Jan</p>
          <h3 className="text-4xl font-bold text-white mb-2">
            Premium Collection
          </h3>
          <h2 className="text-5xl font-extrabold text-white mb-6">
            Flash Sale
          </h2>
          <p className="text-white mb-6 text-lg leading-relaxed">
            Discover exclusive deals on our latest products. Don't miss out on
            our sale!
          </p>
          <Link to="/shop">
            <button className="bg-white text-[#060640] px-8 py-3 rounded-full font-semibold hover:bg-red-100 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MidSection;
