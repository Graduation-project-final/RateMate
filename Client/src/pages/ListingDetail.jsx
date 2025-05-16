import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReviewForm from "../components/SearchAndReview/ReviewForm"; // Adjust the import path as necessary

const ListingDetail = () => {
  const { category, id } = useParams();

  const listings = [
    // Restaurants
    {
      id: 1,
      name: "Gourmet Bistro",
      category: "Restaurants",
      description: "Fine dining with a scenic view and exquisite cuisine.",
      rating: 4.7,
      image:
        "https://img.freepik.com/free-photo/plate-profiteroles-served-with-chocolate-sauce_114579-2339.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    },
    {
      id: 2,
      name: "Seafood Delight",
      category: "Restaurants",
      description: "Fresh seafood with a modern twist in a coastal setting.",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1780&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=jakub-kapusnak-vAJnx4P4CwI-unsplash.jpg&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      name: "Urban Café",
      category: "Restaurants",
      description:
        "A cozy spot for coffee and pastries in the heart of the city.",
      rating: 4.3,
      image:
        "https://img.freepik.com/premium-photo/affogato-rainsoaked-patio-affogato-food-image-photography_1020697-546891.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    },

    // HomeServices
    {
      id: 4,
      name: "Luxury Cleaning",
      category: "HomeServices",
      description:
        "Top-notch cleaning services for residential and commercial spaces.",
      rating: 4.8,
      image:
        "https://img.freepik.com/premium-photo/cleaning-car-seats-by-hand-detailing-worker-cleaning-car-interiors-leather-furniture_76964-350878.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    },
    {
      id: 5,
      name: "Handyman Pro",
      category: "HomeServices",
      description: "Expert repairs and maintenance for all your home needs.",
      rating: 4.6,
      image:
        "https://img.freepik.com/free-photo/variety-handy-tools-dark-background-labor-day-background-concept_1150-41808.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=sph",
    },
    {
      id: 6,
      name: "Garden Masters",
      category: "HomeServices",
      description: "Professional gardening and landscaping services.",
      rating: 4.7,
      image:
        "https://img.freepik.com/premium-photo/landscape-architecture-design-renderings_605022-136008.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    },

    // AutoServices
    {
      id: 7,
      name: "Quick Fix Auto",
      category: "AutoServices",
      description: "Reliable auto repair services with fast turnaround.",
      rating: 4.4,
      image:
        "https://img.freepik.com/premium-photo/mechanic-repairing-car-engine_1261838-9626.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    },
    {
      id: 8,
      name: "Elite Car Wash",
      category: "AutoServices",
      description: "Premium car wash and detailing services for your vehicle.",
      rating: 4.6,
      image:
        "https://img.freepik.com/free-photo/car-wash-detailing-station_1303-22314.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    },
    {
      id: 9,
      name: "Tire Experts",
      category: "AutoServices",
      description:
        "Specialized tire services including sales, repairs, and replacements.",
      rating: 4.5,
      image:
        "https://img.freepik.com/free-photo/mid-adult-mechanic-working-with-car-tire-auto-repair-shop_637285-7618.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    },
  ];

  // Static reviews for demonstration purposes
  const initialReviews = [
    {
      id: "1",
      comment: "Amazing place! Would definitely come back.",
      rating: 5,
      avatar:
        "https://t4.ftcdn.net/jpg/00/97/00/09/240_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg",
      userName: "islam",
    },
    {
      id: "2",
      comment: "The location was great, but the service could be improved.",
      rating: 3,
      avatar:
        "https://t4.ftcdn.net/jpg/00/97/00/09/240_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg",
      userName: "Omar",
    },
    {
      id: "3",
      comment: "Had a pleasant stay, though it was a bit noisy at night.",
      rating: 4,
      avatar:
        "https://t4.ftcdn.net/jpg/00/97/00/09/240_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg",
      userName: "farooq",
    },
  ];

  // Find the listing that matches the ID from the URL
  const listing = listings.find((listing) => listing.id === parseInt(id, 10));

  const [reviews, setReviews] = useState(initialReviews);

  const handleAddReview = (review) => {
    setReviews((prevReviews) => [...prevReviews, review]);
  };

  if (!listing) return <p>Listing not found</p>;

  return (
    <div className="container mx-auto px-32 py-8">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Listing Details */}
        <div className="p-6">
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-[25rem] object-cover rounded-xl"
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {listing.name}
          </h2>
          <p className="text-gray-600 mt-2">{listing.description}</p>
          <div className="mt-4 flex items-center">
            <span className="text-yellow-400">
              {Array(Math.round(listing.rating))
                .fill()
                .map((_, i) => (
                  <svg
                    key={i}
                    className="inline-block w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
            </span>
            <span className="ml-2 text-gray-700 font-semibold">
              {listing.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="flex flex-col lg:flex-row gap-4 mt-8">
        {/* Review Form */}
        <div className="lg:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Add a Review</h3>
          <ReviewForm onAddReview={handleAddReview} />
        </div>

        {/* Reviews List */}
        <div className="lg:w-1/2">
          <h3 className="text-lg font-semibold mb-4">Reviews</h3>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review, index) => (
                <li
                  key={index}
                  className="mb-4 p-4 border rounded-lg bg-gray-50 flex items-start"
                >
                  <Link
                    key={review.id}
                    to={`/profile/${review.id}`}
                    className="block mb-4 p-4  rounded-lg bg-gray-50 flex items-start cursor-pointer"
                  >
                    <img
                      src={review.avatar}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="text-gray-800 font-semibold">
                        {review.userName}
                      </p>
                      <p className="text-gray-600 mt-1">{review.comment}</p>
                      <div className="mt-2 flex items-center">
                        <span className="text-yellow-400">
                          {Array(review.rating)
                            .fill()
                            .map((_, i) => (
                              <svg
                                key={i}
                                className="inline-block w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
