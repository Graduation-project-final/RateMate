import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Amman");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const jordanLocations = [
    "Amman",
    "Irbid",
    "Zarqa",
    "Aqaba",
    "Madaba",
    "Jerash",
    "Ajloun",
    "Salt",
    "Karak",
    "Tafilah",
  ];
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Search for places..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#060640]"
          />
          <motion.button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#060640] text-white p-2 rounded-full">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </motion.button>
        </div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-full md:w-auto flex items-center justify-between p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#060640]"
          >
            <span>{location}</span>
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
              >
                <ul className="py-1 text-gray-700 max-h-60 overflow-y-auto">
                  {jordanLocations.map((city) => (
                    <li
                      key={city}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setLocation(city);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#060640] text-white py-3 px-6 rounded-md hover:opacity-90"
        >
          Search
        </motion.button>
      </div>
    </div>
  );
};

export default Search;
