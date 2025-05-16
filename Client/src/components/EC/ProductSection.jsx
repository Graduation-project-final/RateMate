import React from "react";
import { useCart } from "../../hooks/CartContext";

const products = [
  {
    id: 1,
    name: "Boat Headphone",
    price: 120,
    image: "./src/assets/images/(5).png",
  },
  {
    id: 2,
    name: "Rocky Mountain",
    price: 420,
    image: "./src/assets/images/(19).png",
  },
  {
    id: 3,
    name: "Goggles",
    price: 320,
    image: "./src/assets/images/(30).png",
  },
  {
    id: 4,
    name: "Printed",
    price: 220,
    image: "./src/assets/images/(4).png",
  },
  {
    id: 5,
    name: "Boat Headphone",
    price: 120,
    image: "./src/assets/images/(26).png",
  },
  {
    id: 6,
    name: "Rocky Mountain",
    price: 420,
    image: "./src/assets/images/(6).png",
  },
  {
    id: 7,
    name: "Goggles",
    price: 320,
    image: "./src/assets/images/(1).png",
  },
  {
    id: 8,
    name: "Printed",
    price: 220,
    image: "./src/assets/images/(3).png",
  },
];

const ProductSection = () => {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
        Our Products
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Explore Our Latest Collection
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative group bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 text-base">${product.price}</p>
            </div>
            <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="bg-[#060640] text-white px-6 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-[#faded9] hover:text-[#060640] transition-colors duration-300"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
