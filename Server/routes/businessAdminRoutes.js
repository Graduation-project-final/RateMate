const express = require("express");
const {
  getUserSubscriptions,
} = require("../controllers/businessAdminController");
const verifyToken = require("../middlewares/auth");

const router = express.Router();

router.get("/subscriptions", verifyToken, getUserSubscriptions);

module.exports = router;
