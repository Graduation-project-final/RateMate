import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StarRating = ({ rating }) => {
  return (
    <span className="text-yellow-500 flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          fill={index < Math.round(rating) ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z"
          />
        </svg>
      ))}
    </span>
  );
};

const Card = ({ card, onFavoriteClick }) => (
  <div className="w-full sm:w-[300px] md:w-[325px] lg:w-[350px] h-[450px] bg-[#ffffff] shadow-lg rounded-3xl p-5 hover:scale-105 transition-all duration-300">
    <div className="relative">
      <img
        src={`http://localhost:4000/${card.mainImage}`}
        alt={card.title}
        className="w-full h-[200px] md:h-[250px] rounded-[30px] object-cover object-center"
      />
      <motion.svg
        onClick={() => onFavoriteClick(card.id, card.isFavorited)}
        animate={{
          scale: card.isFavorited ? 1.2 : 1,
          fill: card.isFavorited ? "red" : "none",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-10 md:h-10 cursor-pointer"
        style={{ outline: "none" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={card.isFavorited ? "red" : "white"}
        />
      </motion.svg>
    </div>
    <div className="mt-5">
      <h2 className="text-lg md:text-2xl font-bold mt-1 text-[#060640]">
        {card.title}
      </h2>
      <p className="text-gray-600 mt-1">{card.address}</p>
      <div className="flex items-center mt-1">
        <StarRating rating={parseFloat(card.avgRating)} />
        <span className="ml-2 text-gray-600">({card.avgRating || 0})</span>
      </div>
    </div>
  </div>
);

const TopRated = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesResponse = await axios.get(
          "http://localhost:4000/api/services/avg-rating"
        );
        const servicesData = servicesResponse.data;

        const updatedCards = servicesData.map((service) => ({
          ...service,
          isFavorited: false,
        }));

        setCards(updatedCards);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Error fetching services.");
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesResponse = await axios.get(
          "http://localhost:4000/api/favorites/active",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        const favoritesData = favoritesResponse.data;

        setCards((prevCards) =>
          prevCards.map((card) => ({
            ...card,
            isFavorited:
              favoritesData.length > 0 &&
              favoritesData.some((fav) => fav.serviceId === card.id),
          }))
        );
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleFavoriteClick = async (id, isFavorited) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, isFavorited: !card.isFavorited } : card
    );
    setCards(updatedCards);

    const serviceId = id;
    const authToken = localStorage.getItem("authToken");

    try {
      let response;
      if (isFavorited) {
        response = await axios.delete(
          "http://localhost:4000/api/removeFromFavorite",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            data: { serviceId },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:4000/api/addToFavorite",
          { serviceId },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      }
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating favorites:", error);
      setCards(cards);
    }
  };

  const handleEmojiClick = (id, value) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, rating: value } : card))
    );
  };

  // Calculate the indices for pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="pt-[1rem] mt-16 px-4 sm:px-8 lg:pt-16 xl:px-40">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
          <h2 className="text-lg sm:text-xl mr-4 font-semibold text-[#060640]">
            Top Rated
          </h2>
          <Link
            to="category/list"
            className="flex items-center text-gray-600 hover:underline mt-4 sm:mt-0"
          >
            <span className="mr-2 text-[#515161]">See all resources</span>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentCards.length > 0 ? (
            currentCards.map((card) => (
              <Card
                key={card.id}
                card={card}
                onFavoriteClick={handleFavoriteClick}
                onEmojiClick={handleEmojiClick}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No services available.
            </p>
          )}
        </div>
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-[#060640] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopRated;
