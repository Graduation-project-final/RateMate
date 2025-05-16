const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const verifyToken = require("../middlewares/auth");

router.post("/addToFavorite", verifyToken, favoriteController.createFavorite);
router.get(
  "/favorites/active",
  verifyToken,
  favoriteController.getActiveFavorites
);

router.delete(
  "/removeFromFavorite",
  verifyToken,
  favoriteController.removeFavorite
);
router.get(
  "/user/favorites/services",
  verifyToken,
  favoriteController.getFavoritesWithServices
);

module.exports = router;
