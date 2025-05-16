import React, { useEffect, useState } from "react";
import axios from "axios";
import CategorySectoin from "../components/category/Category";
import FilterSection from "../components/category/FilterSection";
import Search from "../components/category/Search";
import CategoryHero from "../components/category/CategoryHero";

const Category = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/all-services"
        );
        setServices(response.data);
        setFilteredServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedSubcategory, selectedSort, searchQuery]);

  const applyFilters = () => {
    let updatedServices = [...services];

    if (selectedCategory) {
      updatedServices = updatedServices.filter(
        (service) => service.category === selectedCategory
      );
    }

    if (selectedSubcategory) {
      updatedServices = updatedServices.filter(
        (service) => service.subcategory === selectedSubcategory
      );
    }

    if (searchQuery) {
      updatedServices = updatedServices.filter((service) => {
        const serviceName = service.title || ""; // Default to empty string
        return serviceName.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    if (selectedSort) {
      updatedServices.sort((a, b) => {
        if (selectedSort === "Newest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
      });
    }

    setFilteredServices(updatedServices);
  };

  return (
    <>
      <CategoryHero />
      <Search setSearchQuery={setSearchQuery} />
      <FilterSection
        setSelectedCategory={setSelectedCategory}
        setSelectedSubcategory={setSelectedSubcategory}
        setSelectedSort={setSelectedSort}
      />
      <CategorySectoin services={filteredServices} />
    </>
  );
};

export default Category;
