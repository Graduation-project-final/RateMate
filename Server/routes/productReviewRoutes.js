const express = require("express");
const router = express.Router();
const productReviewController = require("../controllers/productReviewController");
const verifyToken = require("../middlewares/auth");

router.post(
  "/create-reviews",
  verifyToken,
  productReviewController.createReview
);

router.get(
  "/reviews-product/:productId",
  productReviewController.getProductReviews
);
router.get(
  "/reviews-product/stats/:productId",
  productReviewController.getProductReviewStats
);

router.get(
  "/reviews-product-all",
  productReviewController.getAllProductReviews
);

module.exports = router;
