import React from "react";

const ReviewDistribution = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Review distribution</h2>
      <div className="flex gap-8">
        <div className="w-1/2">
          <h3 className="font-semibold text-sm mb-3">Ratings</h3>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center mb-2">
              <span className="w-4 text-xs font-medium">{rating}</span>
              <div className="flex-grow h-2 ml-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-yellow-400 ${
                    rating === 5 ? "w-full" : "w-1/5"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          <h3 className="font-semibold text-sm mb-3">Top categories</h3>
          <ul className="text-sm space-y-1">
            {[
              "Restaurants (42)",
              "Cafes (28)",
              "Shopping (20)",
              "Tourist Attractions (15)",
              "Hotels (10)",
            ].map((category) => (
              <li key={category} className="flex items-center">
                <span className="w-2 h-2 bg-[#060640] rounded-full mr-2"></span>
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewDistribution;
