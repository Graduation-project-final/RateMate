const express = require("express");
const {
  createReply,
  getRepliesForReview,
  updateReply,
  deleteReply,
  getUserReplies,
} = require("../controllers/ReplyController");
const verifyToken = require("../middlewares/auth");
const router = express.Router();

router.post("/add/replies", verifyToken, createReply);
router.get("/get/allReply/:reviewId", getRepliesForReview);
router.put("/edit/replies/:replyId", verifyToken, updateReply);
router.delete("/delete/replies/:replyId", verifyToken, deleteReply);
router.get("/user/replies", verifyToken, getUserReplies);

module.exports = router;
