import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, ChevronDown, ChevronUp } from "lucide-react";

const UserReplay = () => {
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedReply, setExpandedReply] = useState(null);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        setLoading(true);
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:4000/api/user/replies",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setReplies(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReplies();
  }, []);

  const toggleReply = (id) => {
    setExpandedReply(expandedReply === id ? null : id);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8  min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        User Replies
      </h1>
      {error && <p className="font-bold">No Replies Found</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {replies.map((reply) => (
          <div
            key={reply.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl"
          >
            <div
              className="p-4 cursor-pointer"
              onClick={() => toggleReply(reply.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-700 truncate">
                  {reply.review.title}
                </h3>
                {expandedReply === reply.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-gray-600 mb-2 line-clamp-2 text-sm">
                {reply.content}
              </p>
              <div className="flex justify-between text-xs text-gray-500">
                <p>Created: {new Date(reply.createdAt).toLocaleDateString()}</p>
                <div className="flex">{renderStars(reply.review.rating)}</div>
              </div>
            </div>
            {expandedReply === reply.id && (
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <h4 className="text-md font-semibold mb-2 text-gray-700">
                  Review Details
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {reply.review.category}
                  </p>
                  <p>
                    <span className="font-medium">Subcategory:</span>{" "}
                    {reply.review.subcategory}
                  </p>
                </div>
                <p className="text-sm mb-2">
                  <span className="font-medium">Review Content:</span>{" "}
                  {reply.review.content}
                </p>
                {reply.review.image && (
                  <img
                    src={`http://localhost:4000/${reply.review.image}`}
                    alt="Review"
                    className="mt-2 max-w-full h-auto rounded shadow-md"
                  />
                )}
                <div className="mt-3 p-2 bg-blue-50 rounded-md text-xs">
                  <p className="text-blue-800">
                    <span className="font-medium">Reviewed by:</span>{" "}
                    {reply.review.user.name}
                  </p>
                  <p className="text-blue-800 mt-1">
                    <span className="font-medium">Review Created:</span>{" "}
                    {new Date(reply.review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReplay;
