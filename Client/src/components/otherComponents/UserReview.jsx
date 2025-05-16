import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, Loader } from "lucide-react";

const UserReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          "http://localhost:4000/api/user/reviews",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );

  if (error)
    return <strong className="font-bold text-center">No Review Found</strong>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Reviews
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={`http://localhost:4000/${review.image}`}
              alt={review.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {review.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Category:</span> {review.category}{" "}
                / {review.subcategory}
              </p>
              <div className="flex items-center mb-2">
                <span className="font-medium text-sm text-gray-600 mr-1">
                  Rating:
                </span>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4">{review.content}</p>
              <div className="text-sm text-gray-500">
                <p>
                  By: {review.user.name} ({review.user.email})
                </p>
                <p>Created: {new Date(review.createdAt).toLocaleString()}</p>
                <p>Updated: {new Date(review.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReview;
