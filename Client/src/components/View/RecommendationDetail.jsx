import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReviewForm from "../../components/SearchAndReview/ReviewForm"; // Adjust the import path as necessary

const RecommendationDetail = () => {
  const { category, id } = useParams();

  const recommendations = [
    // Restaurants
    {
      id: 1,
      category: "Restaurants",
      image:
        "https://img.freepik.com/premium-photo/plate-food-with-plant-it_337384-107361.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
      name: "The Gourmet Bistro",
      description:
        "A cozy spot serving gourmet meals with locally sourced ingredients.",
      rating: 4.5,
    },
    {
      id: 2,
      category: "Restaurants",
      image:
        "https://img.freepik.com/free-photo/enjoying-street-food-fest_23-2151543810.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
      name: "Sunset Grill",
      description:
        "Enjoy a spectacular sunset while dining on fresh seafood and steaks.",
      rating: 4.0,
    },
    {
      id: 3,
      category: "Restaurants",
      image:
        "https://img.freepik.com/premium-photo/variety-tacos-are-table-with-variety-tacos_976492-60549.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
      name: "Urban Eats",
      description:
        "Modern dining experience with an eclectic menu and vibrant atmosphere.",
      rating: 4.8,
    },
    // Home Services category
    {
      id: 4,
      category: "HomeServices",
      image:
        "https://img.freepik.com/premium-photo/reflecting-mirrors-polished-surface-ele-generative-ai_1169649-126130.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
      name: "Elite Plumbing Solutions",
      description:
        "Reliable plumbing services with quick response times and expert technicians.",
      rating: 4.2,
    },
    {
      id: 5,
      category: "HomeServices",
      image:
        "https://img.freepik.com/premium-photo/elegant-landscaped-garden-with-hydrangeas-lush-greenery_1128296-307.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
      name: "Green Thumb Landscaping",
      description:
        "Professional landscaping and garden maintenance to beautify your outdoor space.",
      rating: 4.1,
    },
    {
      id: 6,
      category: "HomeServices",
      image:
        "https://media.istockphoto.com/id/1131861548/photo/hands-in-yellow-gloves-washing-gas-stove.jpg?b=1&s=612x612&w=0&k=20&c=sYeynmUkcDAp6cRWMecJSx0l9fhlEfPyxHYOB87R6Fs=",
      name: "Sparkle Cleaners",
      description:
        "Top-notch cleaning services for homes and offices with a focus on detail.",
      rating: 4.6,
    },
    // Auto Services category
    {
      id: 7,
      category: "AutoServices",
      image: "https://www.example.com/images/autoservice1.jpg",
      name: "Precision Auto Repair",
      description:
        "Expert auto repair services with state-of-the-art diagnostic tools.",
      rating: 4.3,
    },
    {
      id: 8,
      category: "AutoServices",
      image: "https://www.example.com/images/autoservice2.jpg",
      name: "Speedy Tire Services",
      description: "Fast and efficient tire replacement and repair services.",
      rating: 4.4,
    },
    {
      id: 9,
      category: "AutoServices",
      image: "https://www.example.com/images/autoservice3.jpg",
      name: "AutoTech Service Center",
      description:
        "Comprehensive auto care with a focus on customer satisfaction and quality.",
      rating: 4.7,
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

  // Find the recommendation that matches the ID from the URL
  const recommendation = recommendations.find(
    (recommendation) => recommendation.id === parseInt(id, 10)
  );

  const [reviews, setReviews] = useState(initialReviews);

  const handleAddReview = (review) => {
    setReviews((prevReviews) => [...prevReviews, review]);
  };

  if (!recommendation) return <p>Recommendation not found</p>;

  return (
    <div className="container mx-auto px-32 py-8">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Recommendation Details */}
        <div className="p-6">
          <img
            src={recommendation.image}
            alt={recommendation.name}
            className="w-full h-[25rem] object-cover rounded-xl"
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {recommendation.name}
          </h2>
          <p className="text-gray-600 mt-2">{recommendation.description}</p>
          <div className="mt-4 flex items-center">
            <span className="text-yellow-400">
              {Array(Math.round(recommendation.rating))
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
              {recommendation.rating}
            </span>
          </div>
        </div>

        {/* Flex Container for Review Form and Reviews List */}
        <div className="flex">
          {/* Review Form */}
          <div className="w-1/2 p-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Write a Review
            </h3>
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
    </div>
  );
};

export default RecommendationDetail;
