import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Banner from "../components/ListingsPage/Banner";
import FilterListing from "../components/ListingsPage/FilterListing";
import Recommendations from "../components/ListingsPage/Recommendations";
import UserReviews from "../components/ListingsPage/UserReviews";
import ListingsGrid from "../components/ListingsPage/ListingsGrid";

const ListingsPage = () => {
  const { category } = useParams();

  const [servicesList, setServicesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/services/category/${category}`
        );
        setServicesList(response.data);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [category]);

  const filteredServices = servicesList
    .filter(
      (service) => !selectedCategory || service.category === selectedCategory
    )
    .filter(
      (service) =>
        !selectedSubcategory || service.subcategory === selectedSubcategory
    )
    .sort((a, b) => {
      if (selectedSort === "Newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (selectedSort === "Oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  if (isLoading) return <div>Loading...</div>;
  if (fetchError)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-lg text-red-500">
          There are no services available in this category.
        </p>
      </div>
    );

  return (
    <div className="bg-[#f9f9f9] min-h-screen p-8">
      <Banner />
      <h1 className="text-4xl font-bold text-[#2c3e50] mb-8 text-center">
        {category} Listings
      </h1>
      <FilterListing
        setSelectedCategory={setSelectedCategory}
        setSelectedSubcategory={setSelectedSubcategory}
        setSelectedSort={setSelectedSort}
      />
      <ListingsGrid services={filteredServices} />
      <Recommendations />
      <UserReviews />
    </div>
  );
};

export default ListingsPage;
