import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Filter from "../components/CategoryDetail/Filter";
import CategoryCard from "../components/CategoryDetail/CategoryCard";
import QQ2 from "../assets/images/QQ2.webp";
import QQ1 from "../assets/images/QQ1.webp";
import QQ3 from "../assets/images/QQ3.webp";
import QQ4 from "../assets/images/QQ4.webp";

const images = {
  AutoServices: QQ3,
  Services: QQ2,
  Restaurants: QQ1,
  More: QQ4,
};

const CategoryDetail = () => {
  const { categoryName, subCategoryName } = useParams();
  const category = categoryName.replace(/-/g, " ");
  const subCategory = subCategoryName
    ? subCategoryName.replace(/-/g, " ")
    : null;

  const heroImage = images[category] || images["More"];

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/services/${categoryName}/${subCategoryName}`
        );
        setListings(response.data);

        setFilteredListings(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [categoryName, subCategoryName]);

  useEffect(() => {
    let filtered = listings;

    if (selectedCategory) {
      filtered = filtered.filter(
        (listing) => listing.category === selectedCategory
      );
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(
        (listing) => listing.subcategory === selectedSubcategory
      );
    }

    if (selectedSort === "Newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (selectedSort === "Oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredListings(filtered);
  }, [listings, selectedCategory, selectedSubcategory, selectedSort]);

  return (
    <div className="max-w-[1640px] m-auto px-4 pt-20">
      <div className="relative lg:px-32">
        <div
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center rounded-xl relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060640] to-[#faded9] opacity-60 rounded-xl"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-[#060640] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center bg-opacity-60 bg-white p-2 sm:p-4 rounded shadow-lg">
              {category.toUpperCase()}
              {subCategory && ` - ${subCategory.toUpperCase()}`}
            </h1>
          </div>
        </div>
      </div>

      <Filter
        setSelectedCategory={setSelectedCategory}
        setSelectedSubcategory={setSelectedSubcategory}
        setSelectedSort={setSelectedSort}
      />

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && (
        <div className="flex items-center justify-center">
          <p className="text-center text-lg text-red-500">
            There are no services available in this category.
          </p>
        </div>
      )}

      {!loading && !error && <CategoryCard listings={filteredListings} />}
    </div>
  );
};

export default CategoryDetail;
