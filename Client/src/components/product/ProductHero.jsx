import React from "react";
import { PlusCircle, Star, MessageSquare, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductHero = () => {
  const navigate = useNavigate();

  // Navigate using React Router
  const navigateToAddProduct = () => {
    console.log("Navigating to /add-product");
    navigate("/add-product");
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      {/* Background pattern overlay with star shapes */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 2px)",
            backgroundSize: "30px 30px, 90px 90px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 py-16 md:py-24 lg:py-32 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 z-10 md:pr-10">
          <div className="flex items-center mb-4">
            <Star className="text-yellow-300 mr-1" size={24} fill="#fcd34d" />
            <Star className="text-yellow-300 mr-1" size={24} fill="#fcd34d" />
            <Star className="text-yellow-300 mr-1" size={24} fill="#fcd34d" />
            <Star className="text-yellow-300 mr-1" size={24} fill="#fcd34d" />
            <Star className="text-yellow-300" size={24} fill="#fcd34d" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Share Your <span className="text-yellow-300">Reviews</span> &{" "}
            <span className="text-purple-300">Ratings</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Join our community of honest reviewers. Help others make informed
            decisions by sharing your experiences with products and services.
          </p>
          <button
            onClick={navigateToAddProduct}
            className="flex items-center bg-white text-purple-800 hover:bg-purple-100 px-6 py-3 rounded-lg font-medium shadow-lg transform transition duration-200 hover:scale-105"
          >
            <PlusCircle className="mr-2" size={20} />
            Add New Product
          </button>
        </div>

        {/* Review Illustration */}
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center z-10">
          <div className="relative w-full max-w-md">
            {/* Main circle background */}
            <div className="absolute inset-0 bg-purple-600 rounded-full opacity-20 transform scale-110"></div>

            {/* Review card illustration */}
            <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 shadow-2xl">
              <div className="absolute -top-6 -right-6 bg-yellow-500 p-4 rounded-full shadow-lg">
                <MessageSquare size={32} />
              </div>

              {/* User profile section */}
              <div className="mb-6 flex items-center border-b border-purple-500 pb-4">
                <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 mr-4"></div>
                <div>
                  <div className="h-4 bg-white bg-opacity-30 rounded mb-2 w-24"></div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className="text-yellow-300 mr-1"
                        fill={star <= 4 ? "#fcd34d" : "none"}
                      />
                    ))}
                  </div>
                </div>
                <div className="ml-auto text-xs text-purple-200 opacity-70">
                  2 days ago
                </div>
              </div>

              {/* Review content */}
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-white bg-opacity-30 rounded w-3/4"></div>
                <div className="h-4 bg-white bg-opacity-30 rounded"></div>
                <div className="h-4 bg-white bg-opacity-30 rounded w-5/6"></div>
                <div className="h-4 bg-white bg-opacity-30 rounded w-2/3"></div>
              </div>

              {/* Product info */}
              <div className="p-3 bg-white bg-opacity-10 rounded-lg flex items-center mb-4">
                <div className="h-16 w-16 rounded bg-white bg-opacity-20 mr-4"></div>
                <div className="flex-1">
                  <div className="h-4 bg-white bg-opacity-30 rounded mb-2"></div>
                  <div className="h-3 bg-white bg-opacity-20 rounded w-3/4"></div>
                  <div className="flex items-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={10}
                        className="text-yellow-300 mr-1"
                        fill="#fcd34d"
                      />
                    ))}
                    <span className="text-xs ml-1 text-yellow-200">(241)</span>
                  </div>
                </div>
              </div>

              {/* Engagement metrics */}
              <div className="flex justify-between text-sm text-purple-200">
                <div className="flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  <span>128 helpful</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare size={14} className="mr-1" />
                  <span>24 comments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative star elements */}
      <div className="absolute top-20 left-10 text-yellow-300 opacity-20">
        <Star size={64} fill="#fcd34d" />
      </div>
      <div className="absolute bottom-20 right-10 text-yellow-300 opacity-20">
        <Star size={96} fill="#fcd34d" />
      </div>
      <div className="absolute top-40 right-40 text-purple-300 opacity-10">
        <Star size={48} fill="#d8b4fe" />
      </div>
      <div className="absolute bottom-40 left-32 text-purple-300 opacity-10">
        <Star size={32} fill="#d8b4fe" />
      </div>
    </div>
  );
};

export default ProductHero;
