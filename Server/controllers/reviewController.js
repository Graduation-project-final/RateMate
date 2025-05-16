const { Review, User, Services, UserProfile } = require("../models");
const Sequelize = require("sequelize");

const createReview = async (req, res) => {
  try {
    const { title, category, subcategory, rating, content, serviceId } =
      req.body;

    if (!title || !category || !rating || !content || !serviceId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newReview = await Review.create({
      title,
      category,
      subcategory,
      rating,
      content,
      userId: req.userId,
      serviceId,
      image: req.file?.path,
    });

    return res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review", error);
    return res.status(500).json({ message: "Error creating review", error });
  }
};

const getServiceRatingStats = async (req, res) => {
  try {
    const { serviceId } = req.params;

    if (!serviceId) {
      return res.status(400).json({ message: "Service ID is required." });
    }

    const reviews = await Review.findAll({ where: { serviceId } });

    const numRatings = reviews.length;
    const avgRating =
      numRatings > 0
        ? (
            reviews.reduce((acc, review) => acc + review.rating, 0) / numRatings
          ).toFixed(2)
        : "0.00";

    return res.status(200).json({ numRatings, avgRating });
  } catch (error) {
    console.error("Error fetching rating stats", error);
    return res
      .status(500)
      .json({ message: "Error fetching rating stats", error });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;

    if (!serviceId) {
      return res.status(400).json({ message: "Service ID is required." });
    }

    const reviews = await Review.findAll({
      where: { serviceId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
          include: [
            {
              model: UserProfile,
              as: "profile",
              attributes: ["profilePhoto"],
            },
          ],
        },
        {
          model: Services,
          as: "service",
          attributes: ["id", "title", "category", "subcategory"],
        },
      ],
    });

    const formattedReviews = reviews.map((review) => ({
      id: review.id,
      title: review.title,
      category: review.category,
      subcategory: review.subcategory,
      rating: review.rating,
      content: review.content,
      image: review.image,
      userId: review.userId,
      userName: review.user ? review.user.name : null,
      profilePhoto:
        review.user && review.user.profile
          ? review.user.profile.profilePhoto
          : null,
      serviceId: review.serviceId,
      serviceTitle: review.service ? review.service.title : null,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }));

    return res.status(200).json(formattedReviews);
  } catch (error) {
    console.error("Error fetching reviews", error);
    return res.status(500).json({ message: "Error fetching reviews", error });
  }
};

const editReview = async (req, res) => {
  const { reviewId } = req.params;

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.userId;
  const { title, category, subcategory, rating, content } = req.body;

  try {
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this review" });
    }

    if (title) review.title = title;
    if (category) review.category = category;
    if (subcategory) review.subcategory = subcategory;
    if (rating) review.rating = rating;
    if (content) review.content = content;
    if (req.file) review.image = req.file.path;

    await review.save();

    return res
      .status(200)
      .json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error("Error updating review:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.userId;

  try {
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this review" });
    }

    await review.destroy();

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserReviewCount = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const reviewCount = await Review.count({
      where: { userId },
    });

    return res.status(200).json({ userId, reviewCount });
  } catch (error) {
    console.error("Error fetching user's review count", error);
    return res
      .status(500)
      .json({ message: "Error fetching user's review count", error });
  }
};

const getAllServicesWithAvgRating = async (req, res) => {
  try {
    const services = await Services.findAll({
      include: [
        {
          model: Review,
          as: "reviews",
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [Sequelize.fn("AVG", Sequelize.col("reviews.rating")), "avgRating"],
        ],
      },
      group: ["Services.id"],
    });

    const formattedServices = services.map((service) => ({
      id: service.id,
      title: service.title,
      category: service.category,
      subcategory: service.subcategory,
      address: service.address,
      description: service.description,
      contact: service.contact,
      mainImage: service.mainImage,
      subImages: service.subImages,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
      avgRating: parseFloat(service.getDataValue("avgRating") || 0).toFixed(2),
    }));

    return res.status(200).json(formattedServices);
  } catch (error) {
    console.error("Error fetching services with average ratings", error);
    return res.status(500).json({ message: "Error fetching services", error });
  }
};

const getReviewsWithUserNames = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
          include: [
            {
              model: UserProfile,
              as: "profile",
              attributes: ["profilePhoto"],
            },
          ],
        },
        {
          model: Services,
          as: "service",
          attributes: ["id", "title", "category", "subcategory"],
        },
      ],
    });

    const formattedReviews = reviews.map((review) => ({
      id: review.id,
      title: review.title,
      category: review.category,
      subcategory: review.subcategory,
      rating: review.rating,
      content: review.content,
      image: review.image,
      userId: review.userId,
      userName: review.user ? review.user.name : null,
      profilePhoto:
        review.user && review.user.profile
          ? review.user.profile.profilePhoto
          : null,
      serviceId: review.serviceId,
      serviceTitle: review.service ? review.service.title : null,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }));

    return res.status(200).json(formattedReviews);
  } catch (error) {
    console.error("Error fetching reviews with user names", error);
    return res.status(500).json({ message: "Error fetching reviews", error });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const userId = req.userId;

    const userReviews = await Review.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: "user", // Use the alias defined in your Review model
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!userReviews || userReviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this user." });
    }

    return res.status(200).json(userReviews);
  } catch (error) {
    console.error("Error retrieving user reviews", error);
    return res
      .status(500)
      .json({ message: "Error retrieving user reviews", error });
  }
};

module.exports = {
  createReview,
  getServiceRatingStats,
  getAllReviews,
  editReview,
  deleteReview,
  getUserReviewCount,
  getAllServicesWithAvgRating,
  getReviewsWithUserNames,
  getUserReviews,
};
