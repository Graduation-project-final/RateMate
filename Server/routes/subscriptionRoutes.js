"use strict";
const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const verifyToken = require("../middlewares/auth");

router.post(
  "/subscriptions/create",
  verifyToken,
  subscriptionController.createSubscription
);
router.get(
  "/subscriptions/get-all",
  subscriptionController.getAllSubscriptions
);

router.put(
  "/subscriptions/status",
  subscriptionController.updateSubscriptionStatus
);

module.exports = router;
