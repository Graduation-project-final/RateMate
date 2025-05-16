import React, { useEffect, useState, useRef } from "react";
import { Heart, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const UserFavorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:4000";

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `${BASE_URL}/api/user/favorites/services`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const SubImageGallery = ({ images }) => {
    const scrollContainer = useRef(null);

    const scroll = (scrollOffset) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollBy({
          left: scrollOffset,
          behavior: "smooth",
        });
      }
    };

    return (
      <div className="relative mb-4">
        <button
          onClick={() => scroll(-100)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 shadow-md z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <div
          ref={scrollContainer}
          className="flex overflow-x-auto scrollbar-hide space-x-2 pl-8 py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((img, index) => (
            <div key={index} className="flex-shrink-0">
              <img
                src={`${BASE_URL}/${img}`}
                alt={`Subimage ${index}`}
                className="w-20 h-20 object-cover rounded-md transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll(100)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 shadow-md z-10"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center mt-10 ">
        <div className=" px-4  rounded relative" role="alert">
          <p className="text-gray-500">No favorite services available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Your Favorite Services
      </h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={`${BASE_URL}/${favorite.service.mainImage}`}
                alt={favorite.service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {favorite.service.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  Category: {favorite.service.category}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Address: {favorite.service.address}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  {favorite.service.description}
                </p>
                <p className="text-sm font-medium text-blue-600 mb-4">
                  Contact: {favorite.service.contact}
                </p>

                <SubImageGallery images={favorite.service.subImages} />

                <div className="flex justify-end">
                  <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p className="text-lg">No favorites found.</p>
          <p className="mt-2">
            Start exploring services to add some favorites!
          </p>
        </div>
      )}
    </div>
  );
};

export default UserFavorite;
