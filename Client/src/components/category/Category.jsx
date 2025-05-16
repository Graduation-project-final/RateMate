import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";

const Category = ({ services }) => {
  const servicesPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(services.length / servicesPerPage);

  const startIndex = (currentPage - 1) * servicesPerPage;
  const currentServices = services.slice(
    startIndex,
    startIndex + servicesPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const ServiceCard = ({ service }) => {
    return (
      <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
        <div className="relative h-48 overflow-hidden">
          <img
            src={`http://localhost:4000/${service.mainImage}`}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h2 className="absolute bottom-4 left-4 text-white font-bold text-xl">
            {service.title}
          </h2>
        </div>
        <div className="p-4">
          <p className="text-gray-600 mb-2">{service.description}</p>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Users size={16} className="mr-1" />
            <span>Contact: {service.contact}</span>
          </div>
          <Link
            to={`/listing/${service.category}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            View Listings
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1640px] m-auto px-4 pt-20">
      <h1 className="text-[#060640] font-bold text-4xl text-center">
        Top Rated Services
      </h1>
      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6 lg:px-32">
        {currentServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Pagination Controls */}
      <ul className="flex space-x-4 justify-center py-6">
        <li
          className={`flex items-center justify-center shrink-0 w-10 h-10 rounded-full ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200 cursor-pointer"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-3 ${
              currentPage === 1 ? "fill-gray-400" : "fill-gray-600"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </li>
        {[...Array(totalPages)].map((_, pageIndex) => (
          <li
            key={pageIndex}
            className={`flex items-center justify-center shrink-0 border-2 cursor-pointer text-base font-bold w-10 h-10 rounded-full ${
              currentPage === pageIndex + 1
                ? "bg-[#060640] text-white border-[#060640]"
                : "hover:bg-gray-50 text-[#333]"
            }`}
            onClick={() => handlePageChange(pageIndex + 1)}
          >
            {pageIndex + 1}
          </li>
        ))}
        <li
          className={`flex items-center justify-center shrink-0 w-10 h-10 rounded-full ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200 cursor-pointer"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-3 ${
              currentPage === totalPages ? "fill-gray-400" : "fill-gray-600"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </li>
      </ul>
    </div>
  );
};

export default Category;
