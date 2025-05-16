import React from "react";
import { HeartIcon, PlusIcon, StarIcon } from "@heroicons/react/24/solid";

function ProductCard({
  product,
  onProductClick,
  onToggleFavorite,
  isFavorite,
}) {
  return (
    <div
      onClick={() => onProductClick(product)}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl max-w-96 cursor-pointer"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-opacity duration-300 hover:opacity-80"
        />
        <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {product.discount}% Off
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering onProductClick
            onToggleFavorite();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg transition-transform hover:scale-110"
        >
          <HeartIcon
            className={`h-6 w-6 ${
              isFavorite ? "text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <div className="flex items-center mb-2">
          {[...Array(product.rating)].map((_, i) => (
            <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
          ))}
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-red-600 text-xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-gray-500 text-sm line-through">
            ${(product.price * (1 + product.discount / 100)).toFixed(2)}
          </span>
        </div>
        <button className="bg-red-600 text-white p-3 rounded-full shadow-md transition-transform hover:scale-110 w-full flex items-center justify-center">
          <PlusIcon className="h-6 w-6" />
          <span className="ml-2">Add to Cart</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
