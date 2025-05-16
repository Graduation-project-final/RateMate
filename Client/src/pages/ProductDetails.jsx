import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Tag,
  CheckCircle,
  Loader2,
  X,
  ImagePlus,
  ExternalLink,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Custom navy color
  const navyColor = "#060640";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/products/approved/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <Loader2
          size={32}
          className="animate-spin mb-4"
          style={{ color: navyColor }}
        />
        <p className="text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <X size={32} className="text-red-500 mb-4" />
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 rounded-lg text-white"
          style={{ backgroundColor: navyColor }}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <X size={32} className="text-gray-400 mb-4" />
        <p className="text-gray-600">Product not found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 rounded-lg text-white"
          style={{ backgroundColor: navyColor }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Products
      </button>

      {/* Product Details */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div className="md:flex">
          {/* Main Image */}
          <div className="md:w-1/2 p-6">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
              {product.mainImage ? (
                <img
                  src={`http://localhost:4000/${product.mainImage}`}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImagePlus size={48} className="text-gray-300" />
                </div>
              )}
            </div>

            {/* Sub Images */}
            {product.subImages && product.subImages.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Additional Images
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.subImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative bg-gray-100 rounded-md overflow-hidden aspect-square"
                    >
                      <img
                        src={`http://localhost:4000/${img}`}
                        alt={`${product.title} - ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-6">
            <div className="flex items-center mb-4">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                <CheckCircle size={12} className="mr-1" />
                {product.status}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.title}
            </h1>

            <div className="flex items-center mb-4">
              <Tag size={16} className="text-gray-400 mr-2" />
              <span className="text-sm text-gray-500">{product.category}</span>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Description
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {product.productUrl && (
              <div className="mb-6">
                <a
                  href={product.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <span>View Product Website</span>
                  <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            )}

            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={14} className="mr-2" />
              <span>
                Posted on {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
