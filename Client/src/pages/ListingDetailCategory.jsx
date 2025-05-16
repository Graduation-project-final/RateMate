import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, Edit, MessageCircle, Trash } from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const ListingDetailCategory = () => {
  const navigate = useNavigate();

  const {
    categoryName: category,
    subCategoryName: subcategory,
    listingId,
  } = useParams();
  const [listing, setListing] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [updatedContent, setUpdatedContent] = useState("");
  const [ratingStats, setRatingStats] = useState({
    numRatings: 0,
    avgRating: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedSubcategory, setUpdatedSubcategory] = useState("");
  const [updatedRating, setUpdatedRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [replies, setReplies] = useState({});
  const [updatedReplyContent, setUpdatedReplyContent] = useState("");
  const [selectedReply, setSelectedReply] = useState(null);

  const handleEditReply = async (replyId) => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.put(
        `http://localhost:4000/api/edit/replies/${replyId}`,
        { content: updatedReplyContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReplies((prevReplies) => ({
        ...prevReplies,
        [selectedReply.reviewId]: prevReplies[selectedReply.reviewId].map(
          (reply) =>
            reply.id === replyId
              ? { ...reply, content: updatedReplyContent }
              : reply
        ),
      }));

      toast.success("Reply edited successfully!");
      setSelectedReply(null);
      setUpdatedReplyContent("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error editing reply.";
      console.error("Error editing reply:", error);
      toast.error(errorMessage);
    }
  };

  const handleDeleteReply = async (replyId) => {
    const token = localStorage.getItem("authToken");

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:4000/api/delete/replies/${replyId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Ensure selectedReply is set and has the correct reviewId
        if (selectedReply && selectedReply.reviewId) {
          console.log(
            `Fetching replies for reviewId: ${selectedReply.reviewId}`
          );

          // Refetch replies for the specific review after deletion
          await fetchReplies(selectedReply.reviewId);
        } else {
          console.warn("No selected reply or reviewId set");
        }

        toast.success("Reply deleted successfully!");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Error deleting reply.";
        console.error("Error deleting reply:", error);
        toast.error(errorMessage);
      }
    }
  };

  const fetchReplies = async (reviewId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/get/allReply/${reviewId}`
      );
      setReplies((prevReplies) => ({
        ...prevReplies,
        [reviewId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching replies", error);
    }
  };

  useEffect(() => {
    reviews.forEach((review) => {
      fetchReplies(review.id);
    });
  }, [reviews]);

  const handleReply = (reviewId) => {
    fetchReplies(reviewId);
    navigate(`/Reply/${reviewId}`);
  };

  useEffect(() => {
    const fetchRatingStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/reviews/stats/${listingId}`
        );
        setRatingStats(response.data);
      } catch (error) {
        console.error("Error fetching rating stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRatingStats();
  }, [listingId]);

  useEffect(() => {
    const fetchListing = async () => {
      const response = await fetch(
        `http://localhost:4000/api/services/${category}/${subcategory}/${listingId}`
      );
      const data = await response.json();
      setListing(data);
    };
    fetchListing();
  }, [category, subcategory, listingId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/reviews/${listingId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [listingId]);

  const handleEditReview = async (reviewId) => {
    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("content", updatedContent);
    formData.append("title", updatedTitle);
    formData.append("category", updatedCategory);
    formData.append("subcategory", updatedSubcategory);
    formData.append("rating", updatedRating);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put(
        `http://localhost:4000/api/reviews-edit/${reviewId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                content: updatedContent,
                title: updatedTitle,
                category: updatedCategory,
                subcategory: updatedSubcategory,
                rating: updatedRating,
                image: imageFile?.name,
              }
            : review
        )
      );
      toast.success("Review edited successfully!");
      setIsEditModalOpen(false);
      setUpdatedContent("");
      setUpdatedTitle("");
      setUpdatedCategory("");
      setUpdatedSubcategory("");
      setUpdatedRating(0);
      setImageFile(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error editing review.";
      console.error("Error editing review:", error);
      toast.error(errorMessage);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const token = localStorage.getItem("authToken");

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:4000/api/reviews-delete/${reviewId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReviews((prev) => prev.filter((review) => review.id !== reviewId));
        toast.success("Review deleted successfully!");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Error deleting review.";
        console.error("Error deleting review:", error);
        toast.error(errorMessage);
      }
    }
  };

  const handleMapOpen = () => setIsMapOpen(true);
  const handleMapClose = () => setIsMapOpen(false);
  const handleOutsideClick = (event) => {
    if (event.target.id === "map-modal") handleMapClose();
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };
  const handleImageModalClose = () => setIsImageModalOpen(false);

  const openEditModal = (review) => {
    setSelectedReview(review);
    setUpdatedContent(review.content);
    setUpdatedTitle(review.title);
    setUpdatedCategory(review.category);
    setUpdatedSubcategory(review.subcategory);
    setUpdatedRating(review.rating);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedReview(null);
    setUpdatedContent("");
  };

  useEffect(() => {
    if (isMapOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMapOpen]);

  if (!listing) {
    return <p className="text-center text-red-500">Listing not found</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12 space-y-12">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Listing Header */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Image */}
        <div className="relative lg:w-1/2">
          <img
            src={`http://localhost:4000/${listing.mainImage}`}
            alt={listing.title}
            className="w-full h-[400px] object-cover rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-300"
            onClick={() =>
              handleImageClick(`http://localhost:4000/${listing.mainImage}`)
            }
          />
        </div>

        {/* Sub Images */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          {listing.subImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={`http://localhost:4000/${image}`}
                alt={`${listing.title} ${index + 1}`}
                className="w-full h-[200px] object-cover group-hover:scale-110 transform transition-transform duration-300"
                onClick={() =>
                  handleImageClick(`http://localhost:4000/${image}`)
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Images */}
      {isImageModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="relative max-w-xl w-full p-4 bg-white rounded-lg shadow-2xl">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={handleImageModalClose}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto max-h-[60vh] rounded-lg object-contain"
            />
          </div>
        </div>
      )}

      {/* Listing Details */}
      <div className="p-8 bg-gradient-to-r from-white via-baby-pink to-gray-100 rounded-3xl shadow-2xl space-y-6">
        <h1 className="text-5xl font-bold text-navy-blue">{listing.title}</h1>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3">
            <strong className="text-gray-700 text-lg">Category:</strong>
            <span className="text-gray-900">{listing.category}</span>
          </li>
          <li className="flex items-center space-x-3">
            <strong className="text-gray-700 text-lg">Subcategory:</strong>
            <span className="text-gray-900">{listing.subcategory}</span>
          </li>
          <li className="flex items-center space-x-3">
            <strong className="text-gray-700 text-lg">Address:</strong>
            <button className="text-baby-pink underline hover:text-navy-blue">
              {listing.address}
            </button>
          </li>
        </ul>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-navy-blue">Description</h2>
          <p className="leading-relaxed text-gray-600">{listing.description}</p>
        </div>
        <div className="flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-300 p-6 rounded-2xl shadow-lg">
          <div>
            <span className="text-yellow-500 text-5xl font-bold">
              {ratingStats.avgRating} ★
            </span>
            <p className="text-gray-700">{ratingStats.numRatings} reviews</p>
          </div>
          <Link to={`/review/${listingId}`}>
            <button className="bg-blue-950 hover:bg-pink-100 text-white hover:text-blue-950  px-6 py-3 rounded-xl font-semibold shadow-md transform transition-all hover:scale-105">
              Write a Review
            </button>
          </Link>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* User Info */}
              <div className="flex items-center px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-950 text-white">
                <img
                  src={`http://localhost:4000/${
                    review.profilePhoto || "default.png"
                  }`}
                  alt={review.userName}
                  className="w-14 h-14 rounded-full border-2 border-white shadow-lg mr-4"
                />
                <div className="flex-grow">
                  <p className="text-lg font-semibold">{review.userName}</p>
                  <p className="text-sm">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    className="text-white bg-opacity-50 hover:bg-opacity-75 py-1 px-3 rounded-md transition-all"
                    onClick={() => openEditModal(review)}
                  >
                    <Edit className="w-5 h-5 inline-block mr-1" />
                    Edit
                  </button>
                  <button
                    className="text-white bg-opacity-50 hover:bg-opacity-75 py-1 px-3 rounded-md transition-all"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <Trash className="w-5 h-5 inline-block mr-1" />
                    Delete
                  </button>
                </div>
              </div>

              {/* Image Section */}
              {review.image && (
                <div className="overflow-hidden">
                  <img
                    src={`http://localhost:4000/${review.image}`}
                    alt={`Review by ${review.userName}`}
                    className="w-full h-72 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}

              {/* Review Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {review.title}
                </h3>
                <p className="text-gray-600 mb-4">{review.content}</p>

                {/* Rating and Category */}
                <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                  <span className="bg-gray-100 px-4 py-2 rounded-full text-sm">
                    {review.category} - {review.subcategory}
                  </span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-semibold text-gray-800">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Reply Section */}
                <div className="space-y-3 border-t pt-4">
                  {replies[review.id]?.map((reply) => (
                    <div
                      key={reply.id}
                      className="flex items-start p-3 bg-gray-100 rounded-lg"
                    >
                      <img
                        src={`http://localhost:4000/${
                          reply.user.profile?.profilePhoto || "default.png"
                        }`}
                        alt={reply.user.name}
                        className="w-10 h-10 rounded-full mr-4 border shadow"
                      />
                      <div className="flex-grow">
                        <p className="text-gray-900 font-semibold text-sm">
                          {reply.user.name}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          {reply.content}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(reply.createdAt).toLocaleString()}
                        </p>
                        <div className="flex space-x-3 text-sm mt-2">
                          <button
                            className="text-blue-950 hover:underline"
                            onClick={() => {
                              setSelectedReply({
                                reviewId: review.id,
                                replyId: reply.id,
                              });
                              setUpdatedReplyContent(reply.content);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => handleDeleteReply(reply.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    className="text-blue-950 text-sm hover:underline"
                    onClick={() => handleReply(review.id)}
                  >
                    Write a reply...
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Review Modal */}
        {isEditModalOpen && selectedReview && (
          <div
            id="edit-modal"
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-lg font-bold mb-4">Edit Review</h2>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                placeholder="Title"
              />
              <input
                type="text"
                value={updatedCategory}
                onChange={(e) => setUpdatedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                placeholder="Category"
              />
              <input
                type="text"
                value={updatedSubcategory}
                onChange={(e) => setUpdatedSubcategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                placeholder="Subcategory"
              />
              <input
                type="number"
                value={updatedRating}
                onChange={(e) => setUpdatedRating(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                placeholder="Rating (0-5)"
                min="0"
                max="5"
              />
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className="w-full h-32 border border-gray-300 rounded-md p-2 mb-4"
                placeholder="Update your review"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="mb-4"
              />
              <div className="flex justify-end">
                <button
                  className="bg-blue-950 text-white py-2 px-4 rounded-lg hover:bg-blue-900 mr-2"
                  onClick={() => handleEditReview(selectedReview.id)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                  onClick={handleEditModalClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Reply Modal */}
        {selectedReply && (
          <div
            id="edit-reply-modal"
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-lg font-bold mb-4">Edit Reply</h2>
              <textarea
                value={updatedReplyContent}
                onChange={(e) => setUpdatedReplyContent(e.target.value)}
                className="w-full h-32 border border-gray-300 rounded-md p-2 mb-4"
                placeholder="Update your reply"
              />
              <div className="flex justify-end">
                <button
                  className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-950 mr-2"
                  onClick={() => handleEditReply(selectedReply.replyId)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                  onClick={() => setSelectedReply(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingDetailCategory;
