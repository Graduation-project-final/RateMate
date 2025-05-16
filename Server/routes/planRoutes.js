"use strict";
const express = require("express");
const PlanController = require("../controllers/planController");
const router = express.Router();

router.get("/get-all-plan", PlanController.getAllPlans);
router.get("/get-plan-ById/:id", PlanController.getPlanById);
router.post("/create-plan", PlanController.createPlan);
router.put("/update-plan/:id", PlanController.updatePlan);
router.delete("/delete-plan/:id", PlanController.deletePlan);

module.exports = router;
