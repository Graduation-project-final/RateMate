const express = require("express");
const verifyToken = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const {
  updateUserProfile,
  getUserProfile,
  getAllUsersWithProfiles,
} = require("../controllers/userController");

const router = express.Router();

router.put(
  "/profile",
  verifyToken,
  upload.fields([
    { name: "coverPhoto", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
  ]),
  updateUserProfile
);

router.get("/profile", verifyToken, getUserProfile);
router.get("/users/all", getAllUsersWithProfiles);

module.exports = router;
