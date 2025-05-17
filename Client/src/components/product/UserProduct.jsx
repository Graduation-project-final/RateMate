import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const UserProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication required. Please log in.");
        }

        const response = await fetch("http://localhost:4000/api/products/my", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            response.status === 401
              ? "Unauthorized. Please log in again."
              : "Failed to fetch your products"
          );
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

        setProducts(processedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProducts();
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
        {error}.{" "}
        <Link to="/login" className="text-[#060640] underline">
          Login here
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-[1rem] mt-16 px-4 sm:px-8 lg:pt-16 xl:px-40">
      {products.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            You haven't added any products yet.
          </p>
          <Link
            to="/add-product"
            className="inline-block px-6 py-3 bg-[#060640] text-white font-medium rounded-full hover:bg-[#0a0a5a] transition-colors duration-300"
          >
            Create Your First Product
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.mainImage}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Product+Image";
                  }}
                />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 rounded-full text-sm font-medium">
                  {product.status}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-[#060640]">
                    {product.title}
                  </h3>
                  <span className="px-3 py-1 bg-[#F0F0F5] text-[#060640] text-xs font-semibold rounded-full">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 mt-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <Link
                      to={`/productDetails/${product.id}`}
                      className="px-4 py-2 bg-[#060640] text-white text-sm font-medium rounded-full hover:bg-[#0a0a5a] transition-colors duration-300"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProduct;
