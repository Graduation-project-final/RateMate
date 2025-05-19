import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/products/approved"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Process products to include full image URLs
        const processedProducts = data.products.map((product) => ({
          ...product,
          mainImage: `http://localhost:4000/${product.mainImage}`,
          subImages: product.subImages.map(
            (img) => `http://localhost:4000/${img}`
          ),
        }));

        // Get the last 6 products (most recent first)
        const lastSixProducts = processedProducts.slice(-6).reverse();
        setProducts(lastSixProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#060640]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error}. Please try again later.
      </div>
    );
  }

  return (
    <>
      <div className="pt-[1rem] mt-4 px-4 sm:px-8 lg:pt-16 xl:px-40">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
          <h2 className="text-lg sm:text-xl mr-4 font-semibold text-[#060640]">
            Top Products
          </h2>
          <Link
            to="product"
            className="flex items-center text-gray-600 hover:underline mt-4 sm:mt-0"
          >
            <span className="mr-2 text-[#515161]">See all resources</span>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <hr className="my-4 border-[#FADED9] border-[2px]" />
      </div>
      <div className="pt-[1rem] px-4 sm:px-8 xl:px-40">
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden flex-shrink-0">
                <img
                  src={product.mainImage}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Product+Image";
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-[#060640] flex-grow pr-2">
                    {product.title}
                  </h3>
                  <span className="px-3 py-1 bg-[#F0F0F5] text-[#060640] text-xs font-semibold rounded-full flex-shrink-0">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 line-clamp-3 flex-grow">
                  {product.description}
                </p>
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    Added: {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/productDetails/${product.id}`}
                    className="px-4 py-2 bg-[#060640] text-white text-sm font-medium rounded-full hover:bg-[#0a0a5a] transition-colors duration-300 flex-shrink-0"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductSection;
