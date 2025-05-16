const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/auth");
const {
  createReview,
  getServiceRatingStats,
  getAllReviews,
  editReview,
  deleteReview,
  getUserReviewCount,
  getAllServicesWithAvgRating,
  getReviewsWithUserNames,
  getUserReviews,
} = require("../controllers/reviewController");

router.post(
  "/reviews-create",
  verifyToken,
  upload.single("image"),
  createReview
);
router.get("/reviews/stats/:serviceId", getServiceRatingStats);
router.get("/reviews/:serviceId", getAllReviews);
router.put(
  "/reviews-edit/:reviewId",
  verifyToken,
  upload.single("image"),
  editReview
);
router.delete("/reviews-delete/:reviewId", verifyToken, deleteReview);
router.get("/review-count", verifyToken, getUserReviewCount);
router.get("/services/avg-rating", getAllServicesWithAvgRating);
router.get("/reviews", getReviewsWithUserNames);
router.get("/user/reviews", verifyToken, getUserReviews);

module.exports = router;
