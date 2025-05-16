import React, { useEffect, useState } from "react";
import axios from "axios";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/reviews");
        setReviews(response.data);
      } catch (error) {
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-32">
      <h3 className="text-2xl font-semibold text-[#2c3e50] mb-6">
        User's Reviews
      </h3>
      <div className="space-y-6">
        {reviews.slice(0, 6).map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-lg shadow-lg flex items-start space-x-4"
          >
            <img
              src={`http://localhost:4000/${review.profilePhoto}`}
              alt={review.userName}
              className="w-12 h-12 rounded-full border border-gray-300"
            />
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  {review.userName}
                </h4>
                <div className="flex ml-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index < review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.content}</p>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
