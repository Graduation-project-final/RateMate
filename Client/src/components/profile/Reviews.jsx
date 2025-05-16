import React from "react";
import { Link } from "react-router-dom";

const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        No reviews available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Reviews</h2>
        <Link
          to="/userReview"
          className="text-gray-800 text-sm hover:underline"
        >
          View all →
        </Link>
      </div>
      {reviews.map((review) => (
        <div key={review.id} className="border-t pt-4">
          <h3 className="font-bold text-lg mb-1">
            {review.restaurantName || "Restaurant Name"}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {review.cuisine || "Cuisine Type"}
          </p>
          <div className="flex items-center mb-2">
            {[...Array(review.rating)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {review.date || "Date"}
            </span>
          </div>
          <p className="text-sm text-gray-800">
            {review.comment || "Review Comment"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
