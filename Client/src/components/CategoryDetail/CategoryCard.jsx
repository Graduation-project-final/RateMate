import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart } from "lucide-react";

const CategoryCard = ({ listings = [] }) => {
  const { categoryName, subCategoryName } = useParams();
  const category = categoryName.replace(/-/g, " ");
  const subCategory = subCategoryName
    ? subCategoryName.replace(/-/g, " ")
    : null;

  const [favorites, setFavorites] = useState([]); // Track favorite service IDs
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize] = useState(9); // Number of items per page

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
        setFavorites(data.map((item) => item.serviceId)); // Store only serviceId
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []); // Empty dependency array to fetch on mount

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

  // Get the items for the current page
  const paginatedListings = listings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(listings.length / pageSize);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto py-6 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedListings.length === 0 ? (
          <p>No listings available.</p>
        ) : (
          paginatedListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105"
            >
              <img
                src={`http://localhost:4000/${listing.mainImage}`}
                alt={listing.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex flex-col items-start w-full">
                <h2 className="font-bold text-xl text-[#060640] mb-2">
                  {listing.title}
                </h2>
                <p className="text-gray-700 mb-4">{listing.description}</p>
                <div className="flex items-center justify-between w-full">
                  <Link
                    to={`/category/${categoryName.replace(/ /g, "-")}/${
                      subCategoryName
                        ? subCategoryName.replace(/ /g, "-") + "/"
                        : ""
                    }${listing.id}`}
                    className="text-[#060640] hover:underline"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => toggleFavorite(listing.id)}
                    className="text-gray-600 hover:text-red-500 transition-colors"
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
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
