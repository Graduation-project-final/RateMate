import React from "react";
import { ArrowLeftIcon, StarIcon } from "@heroicons/react/24/solid";
import { useCart } from "../../hooks/CartContext";

function ProductDetails({ product, onClose }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // Optionally close the modal or show a confirmation
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-6 border w-[900px] shadow-lg rounded-lg bg-white flex">
        {/* Image Section */}
        <div className="flex-shrink-0 w-1/2 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Details Section */}
        <div className="w-1/2 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold">Quick Details</h2>
          </div>
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <div className="flex items-center mb-2">
            {[...Array(product.rating)].map((_, i) => (
              <StarIcon key={i} className="h-6 w-6 text-yellow-400" />
            ))}
          </div>
          <p className="text-red-500 font-bold text-2xl mb-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-green-600 mb-2">{product.discount}% Off</p>

          {/* Additional Details */}
          <div className="flex flex-col space-y-4 mb-4">
            <div>
              <h4 className="text-lg font-semibold mb-1">Description</h4>
              <p className="text-gray-600">
                {product.description || "No description available."}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">Specifications</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {product.specifications?.map((spec, index) => (
                  <li key={index}>{spec}</li>
                )) || <li>No specifications available.</li>}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">Customer Reviews</h4>
              <p className="text-gray-600">
                {product.reviews?.length ? (
                  product.reviews.map((review, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-semibold">{review.author}</p>
                      <p>{review.text}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews available.</p>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
