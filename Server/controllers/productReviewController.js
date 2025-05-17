const { ProductReview, Product, User } = require("../models");
const { Sequelize } = require("sequelize");

exports.createReview = async (req, res) => {
  try {
    const { productId, rate, description } = req.body;
    const userId = req.userId;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const existingReview = await ProductReview.findOne({
      where: { userId, productId },
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product." });
    }

    const review = await ProductReview.create({
      userId,
      productId,
      rate,
      description,
    });

    res.status(201).json({ message: "Review created successfully.", review });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("Received productId:", productId);

    const product = await Product.findByPk(productId);
    console.log("Product found:", product);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const reviews = await ProductReview.findAll({
      where: { productId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name"],
        },
      ],
    });

    console.log("Reviews found with user data:", reviews);
    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getProductReviewStats = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const stats = await ProductReview.findOne({
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("rate")), "averageRating"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "reviewCount"],
      ],
      where: { productId },
      raw: true,
    });

    res.status(200).json({
      averageRating: parseFloat(stats.averageRating || 0).toFixed(2),
      reviewCount: parseInt(stats.reviewCount),
    });
  } catch (error) {
    console.error("Error getting review stats:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getAllProductReviews = async (req, res) => {
  try {
    const reviews = await ProductReview.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "title", "description", "category", "mainImage"],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
