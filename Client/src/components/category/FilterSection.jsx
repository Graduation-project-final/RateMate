import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FilterSection = ({
  setSelectedCategory,
  setSelectedSubcategory,
  setSelectedSort,
}) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [localSelectedCategory, setLocalSelectedCategory] = useState("");
  const [localSelectedSubcategory, setLocalSelectedSubcategory] = useState("");
  const [selectedSort, setSelectedSortState] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
  };

  const selectCategory = (category) => {
    setLocalSelectedCategory(category);
    setSelectedCategory(category);
    const selected = categories.find((item) => item.name === category);
    setSubcategories(selected ? selected.subcategories : []);
    setLocalSelectedSubcategory("");
    setActiveMenu("");
  };

  const selectSubcategory = (subcategory) => {
    setLocalSelectedSubcategory(subcategory);
    setSelectedSubcategory(subcategory);
    setActiveMenu("");
  };

  const selectSort = async (sortOption) => {
    setSelectedSort(sortOption);
    setActiveMenu("");

    const apiUrl = `http://localhost:4000/api/creatAt?sort=${
      sortOption === "Newest" ? "Newest" : "Oldest"
    }`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const result = await response.json();
      } else {
        console.error("Failed to fetch data from API.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
  };

  const arrowVariants = {
    open: {
      rotate: 180,
      transition: { duration: 0.3 },
    },
    closed: {
      rotate: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-primary text-secondary p-4 rounded-lg w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleMenu("category")}
                className="w-full flex justify-between items-center p-2 border border-accent border-[#060640] rounded"
              >
                <span>{localSelectedCategory || "Select Category"}</span>
                <motion.svg
                  className="w-4 h-4 -z-50"
                  initial="closed"
                  animate={activeMenu === "category" ? "open" : "closed"}
                  variants={arrowVariants}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>
              <AnimatePresence>
                {activeMenu === "category" && (
                  <motion.ul
                    className="absolute mt-2 w-full bg-white border border-accent rounded-lg shadow-lg z-10"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={dropdownVariants}
                  >
                    {categories.map((category) => (
                      <li
                        key={category.name}
                        className="block px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectCategory(category.name)}
                      >
                        {category.name}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Subcategory Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleMenu("subcategory")}
                className="w-full flex justify-between border-[#060640] items-center p-2 border border-accent rounded"
                disabled={!localSelectedCategory}
              >
                <span>
                  {localSelectedSubcategory ||
                    (localSelectedCategory
                      ? "Select Subcategory"
                      : "Select Category First")}
                </span>
                <motion.svg
                  className="w-4 h-4 -z-50"
                  initial="closed"
                  animate={activeMenu === "subcategory" ? "open" : "closed"}
                  variants={arrowVariants}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>
              <AnimatePresence>
                {activeMenu === "subcategory" && localSelectedCategory && (
                  <motion.ul
                    className="absolute mt-2 w-full bg-white border border-accent rounded-lg shadow-lg z-10"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={dropdownVariants}
                  >
                    {subcategories.map((subcategory) => (
                      <li
                        key={subcategory}
                        className="block px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectSubcategory(subcategory)}
                      >
                        {subcategory}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <div className="relative">
              <button
                onClick={() => toggleMenu("sort")}
                className="w-full flex justify-between border-[#060640] items-center p-2 border border-accent rounded"
              >
                <span>{selectedSort || "Sort"}</span>
                <motion.svg
                  className="w-4 h-4 -z-50"
                  initial="closed"
                  animate={activeMenu === "sort" ? "open" : "closed"}
                  variants={arrowVariants}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>
              <AnimatePresence>
                {activeMenu === "sort" && (
                  <motion.ul
                    className="absolute mt-2 w-full bg-white border border-accent rounded-lg shadow-lg z-10"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={dropdownVariants}
                  >
                    {["Newest", "Oldest"].map((sortOption) => (
                      <li
                        key={sortOption}
                        className="block px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectSort(sortOption)}
                      >
                        {sortOption}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
