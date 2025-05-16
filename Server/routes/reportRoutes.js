const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const {
  createReport,
  getAllReports,
  deleteReportAndNotify,
} = require("../controllers/reportController");

router.post("/comment-report", verifyToken, createReport);

router.get("/", verifyToken, getAllReports);

router.delete("/:reportId", verifyToken, deleteReportAndNotify);

module.exports = router;
