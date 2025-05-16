import React, { useState } from "react";
import Search from "../components/SearchAndReview/Search";
import ReviewForm from "../components/SearchAndReview/ReviewForm";
import GuidelinesSection from "../components/SearchAndReview/GuidelinesSection";
import ReviewImage from "../assets/images/reviewForm.jpg";
import Modal from "../components/SearchAndReview/Modal";

export default function SearchAndReview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#060640] mb-6">
        Share Your Experiences and Discover New Places in Jordan
      </h1>
      {/* <Search /> */}
      <div className="flex justify-center mb-5">
        <button
          className="bg-[#060640] w-52 text-white px-4 py-2 rounded-lg hover:opacity-80"
          onClick={openModal}
        >
          Show Guidelines
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <GuidelinesSection />
      </Modal>
      <div className="flex flex-col md:flex-row md:items-stretch md:gap-8 mb-8">
        <div className="flex-1 md:w-1/3">
          <ReviewForm />
        </div>
        <div className="flex-1 h-[calc(100vh-4rem)]">
          {" "}
          {/* Adjust height as needed */}
          <img
            src={ReviewImage}
            alt="Review Illustration"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
