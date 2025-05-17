import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Tag,
  CheckCircle,
  Loader2,
  X,
  ImagePlus,
  ExternalLink,
  Star,
  ChevronRight,
  StarHalf,
  StarOff,
  MessageSquare,
  User,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rate, setRate] = useState("");
  const [description, setDescription] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(null);
  const [reviewError, setReviewError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState({
    averageRating: "0.00",
    reviewCount: 0,
  });

  const navyColor = "#060640";
  const secondaryColor = "#515161";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/products/approved/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();

        // Process images to include full URLs
        const processedProduct = {
          ...data.product,
          mainImage: data.product.mainImage
            ? `http://localhost:4000/${data.product.mainImage}`
            : null,
          subImages:
            data.product.subImages?.map(
              (img) => `http://localhost:4000/${img}`
            ) || [],
        };

        setProduct(processedProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/reviews-product/${id}`
        );
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error("Failed to fetch reviews:", err.message);
      }
    };

    const fetchReviewStats = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/reviews-product/stats/${id}`
        );
        const data = await res.json();
        setReviewStats(data || { averageRating: "0.00", reviewCount: 0 });
      } catch (err) {
        console.error("Failed to fetch review stats:", err.message);
      }
    };

    fetchProduct();
    fetchReviews();
    fetchReviewStats();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setReviewSuccess(null);
    setReviewError(null);
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:4000/api/create-reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: Number(id),
          rate: parseFloat(rate),
          description,
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to submit review");

      setReviewSuccess("Review submitted successfully!");
      setRate("");
      setDescription("");

      // Refresh reviews and stats after submitting
      const reviewsRes = await fetch(
        `http://localhost:4000/api/reviews-product/${id}`
      );
      const reviewsData = await reviewsRes.json();
      setReviews(reviewsData.reviews || []);

      const statsRes = await fetch(
        `http://localhost:4000/api/reviews-product/stats/${id}`
      );
      const statsData = await statsRes.json();
      setReviewStats(statsData || { averageRating: "0.00", reviewCount: 0 });
    } catch (error) {
      setReviewError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <StarHalf
            key={i}
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />
        );
      } else {
        stars.push(<Star key={i} size={16} className="text-gray-300" />);
      }
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2
          size={32}
          className="animate-spin"
          style={{ color: navyColor }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 text-red-500"
      >
        <X size={32} className="mx-auto mb-4" />
        Error: {error}. Please try again later.
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-[#060640] text-white text-sm font-medium rounded-full hover:bg-[#0a0a5a] transition-colors duration-300 flex items-center mx-auto"
        >
          <ArrowLeft size={16} className="mr-2" />
          Go Back
        </button>
      </motion.div>
    );
  }

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 text-gray-600"
      >
        <ImagePlus size={32} className="mx-auto mb-4" />
        Product not found
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-[#060640] text-white text-sm font-medium rounded-full hover:bg-[#0a0a5a] transition-colors duration-300 flex items-center mx-auto"
        >
          <ArrowLeft size={16} className="mr-2" />
          Go Back
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-[1rem] mt-16 px-4 sm:px-8 lg:pt-16 xl:px-40"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#515161] hover:text-[#060640] mb-6 transition-colors duration-300"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Products
      </button>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/2 p-6">
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square">
              {product.mainImage ? (
                <img
                  src={product.mainImage}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <ImagePlus size={48} className="text-gray-300" />
                </div>
              )}
            </div>

            {product.subImages?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Additional Images
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {product.subImages.map((img, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square cursor-pointer"
                    >
                      <img
                        src={img}
                        alt={`${product.title} - ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="md:w-1/2 p-6">
            <div className="flex items-center mb-4">
              <span className="px-3 py-1 bg-[#F0F0F5] text-[#060640] text-xs font-semibold rounded-full flex items-center">
                <CheckCircle size={14} className="mr-2" />
                {product.status}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-[#060640] mb-3">
              {product.title}
            </h1>

            <div className="flex items-center mb-4 text-[#515161]">
              <Tag size={16} className="mr-2" />
              <span className="text-sm">{product.category}</span>
            </div>

            {/* Rating Summary */}
            <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center mr-4">
                {renderStars(parseFloat(reviewStats.averageRating))}
                <span className="ml-2 text-[#060640] font-semibold">
                  {reviewStats.averageRating}
                </span>
              </div>
              <div className="text-sm text-[#515161]">
                {reviewStats.reviewCount} review
                {reviewStats.reviewCount !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[#060640] mb-3">
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
                  className="inline-flex items-center text-[#515161] hover:text-[#060640] transition-colors duration-300"
                >
                  <span>View Product Website</span>
                  <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            )}

            <div className="flex items-center text-sm text-[#515161]">
              <Calendar size={14} className="mr-2" />
              <span>
                Posted on {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <div className="border-t border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-[#060640] mb-4 flex items-center">
            <MessageSquare size={20} className="mr-2" />
            Leave a Review
          </h3>

          {reviewSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-600 mb-4 p-3 bg-green-50 rounded-lg flex items-center"
            >
              <CheckCircle size={16} className="mr-2" />
              {reviewSuccess}
            </motion.div>
          )}
          {reviewError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 mb-4 p-3 bg-red-50 rounded-lg flex items-center"
            >
              <X size={16} className="mr-2" />
              {reviewError}
            </motion.div>
          )}

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#515161] mb-2">
                Rating
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRate(star.toString())}
                    className="focus:outline-none"
                  >
                    {star <= Math.floor(rate) ? (
                      <Star
                        size={24}
                        className="fill-yellow-400 text-yellow-400 transition-all"
                      />
                    ) : star - 0.5 <= parseFloat(rate) &&
                      parseFloat(rate) < star ? (
                      <StarHalf
                        size={24}
                        className="fill-yellow-400 text-yellow-400 transition-all"
                      />
                    ) : (
                      <Star
                        size={24}
                        className="text-gray-300 hover:text-yellow-400 transition-all"
                      />
                    )}
                  </button>
                ))}
                <span className="ml-2 text-sm text-[#515161]">
                  {rate || "0"} out of 5
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#515161] mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#060640] focus:border-transparent transition-all duration-300"
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={submitting || !rate}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 bg-[#060640] text-white text-sm font-medium rounded-full hover:bg-[#0a0a5a] transition-colors duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </motion.button>
          </form>
        </div>

        {/* Reviews List */}
        {reviews.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-[#060640] mb-6 flex items-center">
              <Star size={20} className="mr-2" />
              Customer Reviews
            </h3>
            <div className="space-y-6">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 border border-gray-200 rounded-2xl hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#F0F0F5] flex items-center justify-center mr-3">
                        <User size={18} className="text-[#515161]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#060640]">
                          {review.user?.name || "Anonymous"}
                        </h4>
                        <span className="text-xs text-[#515161]">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {renderStars(review.rate)}
                      <span className="ml-2 text-sm font-medium text-[#060640]">
                        {review.rate}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-3">{review.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetails;
