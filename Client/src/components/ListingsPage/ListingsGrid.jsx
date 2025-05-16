import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart } from "lucide-react";

const ListingsGrid = ({ services = [] }) => {
  // Default to empty array if services is not passed
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]); // Track favorite service IDs
  const listingsPerPage = 6;

  // Fetch favorites from the API on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:4000/api/favorites/active",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }

        const data = await response.json();
        // Assuming the API returns an array of objects with `serviceId` field
        setFavorites(data.map((item) => item.serviceId)); // Store only serviceId
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []); // Empty dependency array to fetch on mount

  // Ensure services is an array before filtering
  const filteredListings = Array.isArray(services)
    ? services.filter((service) => service.category === category)
    : [];

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filteredListings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const toggleFavorite = async (serviceId) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to manage favorites.");
      return;
    }

    try {
      const isFavorited = favorites.includes(serviceId);
      const url = isFavorited
        ? "http://localhost:4000/api/removeFromFavorite"
        : "http://localhost:4000/api/addToFavorite";

      const method = isFavorited ? "DELETE" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ serviceId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update favorites");
      }

      // Update local state after a successful toggle
      setFavorites((prevFavorites) =>
        isFavorited
          ? prevFavorites.filter((favId) => favId !== serviceId)
          : [...prevFavorites, serviceId]
      );
    } catch (error) {
      console.error("Error updating favorites:", error);
      alert("Failed to update favorites. Please try again.");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-32">
        {currentListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-gray-100 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 relative"
          >
            <div className="relative">
              <img
                src={`http://localhost:4000/${listing.mainImage}`}
                alt={listing.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 left-4 bg-[#e74c3c] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {listing.subcategory}
              </div>
              <button
                onClick={() => toggleFavorite(listing.id)}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors"
              >
                <Heart
                  size={24}
                  className={
                    favorites.includes(listing.id)
                      ? "text-red-500 fill-current"
                      : ""
                  }
                />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {listing.title}
              </h2>
              <p className="text-gray-600 mb-4">{listing.description}</p>
              <div className="flex items-center justify-between">
                <Link
                  to={`/category/${category}/${listing.subcategory}/${listing.id}`}
                  className="text-white bg-[#060640] hover:bg-[#05053f] font-semibold py-2 px-4 rounded-lg shadow-md transition-colors w-[22rem] text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

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
    </>
  );
};

export default ListingsGrid;
