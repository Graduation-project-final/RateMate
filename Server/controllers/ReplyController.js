const { Reply, Review, User, UserProfile } = require("../models");

const createReply = async (req, res) => {
  try {
    const { content, reviewId } = req.body;

    if (!content || !reviewId) {
      return res
        .status(400)
        .json({ message: "Content and reviewId are required." });
    }

    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    const newReply = await Reply.create({
      content,
      reviewId,
      userId: req.userId,
    });

    return res.status(201).json(newReply);
  } catch (error) {
    console.error("Error creating reply", error);
    return res.status(500).json({ message: "Error creating reply", error });
  }
};

const getRepliesForReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    const replies = await Reply.findAll({
      where: { reviewId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email"],
          include: [
            {
              model: UserProfile,
              as: "profile",
              attributes: ["profilePhoto"],
            },
          ],
        },
      ],
    });

    if (replies.length === 0) {
      return res
        .status(404)
        .json({ message: "No replies found for this review." });
    }

    return res.status(200).json(replies);
  } catch (error) {
    console.error("Error retrieving replies", error);
    return res.status(500).json({ message: "Error retrieving replies", error });
  }
};

const updateReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required." });
    }

    const reply = await Reply.findByPk(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found." });
    }

    if (reply.userId !== req.userId) {
      return res
        .status(403)
        .json({ message: "You do not have permission to update this reply." });
    }

    reply.content = content;
    await reply.save();

    return res.status(200).json(reply);
  } catch (error) {
    console.error("Error updating reply", error);
    return res.status(500).json({ message: "Error updating reply", error });
  }
};

const deleteReply = async (req, res) => {
  try {
    const { replyId } = req.params;

    const reply = await Reply.findByPk(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found." });
    }

    if (reply.userId !== req.userId) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this reply." });
    }

    await reply.destroy();

    return res.status(200).json({ message: "Reply deleted successfully." });
  } catch (error) {
    console.error("Error deleting reply", error);
    return res.status(500).json({ message: "Error deleting reply", error });
  }
};

const getUserReplies = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const replies = await Reply.findAll({
      where: { userId },
      include: [
        {
          model: Review,
          as: "review",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["name", "email"],
            },
          ],
        },
      ],
    });

    if (!replies.length) {
      return res
        .status(404)
        .json({ message: "No replies found for this user." });
    }

    return res.status(200).json(replies);
  } catch (error) {
    console.error("Error retrieving user replies", error);
    return res
      .status(500)
      .json({ message: "Error retrieving user replies", error });
  }
};

module.exports = {
  createReply,
  getRepliesForReview,
  updateReply,
  deleteReply,
  getUserReplies,
};
