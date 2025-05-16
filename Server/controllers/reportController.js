const { Report, Services, Review, User } = require("../models");
const { sendEmail } = require("../utils/emailUtils");
const { Op } = require("sequelize");

const createReport = async (req, res) => {
  try {
    const { serviceId, reviewId, description } = req.body;
    const userId = req.userId;

    if (!serviceId || !description) {
      return res.status(400).json({
        message: "Service ID and description are required.",
      });
    }

    const service = await Services.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    if (reviewId) {
      const review = await Review.findByPk(reviewId);
      if (!review) {
        return res.status(404).json({ message: "Review not found." });
      }
    }

    const newReport = await Report.create({
      userId,
      serviceId,
      reviewId: reviewId,
      description,
    });

    return res.status(201).json({
      message: "Report submitted successfully.",
      report: newReport,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      where: {
        reviewId: {
          [Op.ne]: null,
        },
      },
      include: [
        { model: Services, as: "service" },
        { model: Review, as: "review", required: true },
        { model: User, as: "user", attributes: ["id", "name", "email"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const deleteReportAndNotify = async (req, res) => {
  try {
    const { reportId } = req.params;

    const report = await Report.findByPk(reportId, {
      include: [
        { model: Review, as: "review" },
        { model: User, as: "user", attributes: ["email", "name"] },
      ],
    });

    if (!report) {
      return res.status(404).json({ message: "Report not found." });
    }

    if (report.review) {
      await report.review.destroy();
    }

    const emailSubject = "Your Report Has Been Reviewed";
    const emailMessage = `Hello ${report.user.name},\n\nThank you for reporting a review. After investigation, the reported review has been deleted.\n\nBest regards,\nRateMate Team`;

    await sendEmail(report.user.email, emailSubject, emailMessage);

    await report.destroy();

    return res.status(200).json({
      message:
        "Review and report deleted successfully, email notification sent.",
    });
  } catch (error) {
    console.error("Error deleting report or sending email:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  createReport,
  getAllReports,
  deleteReportAndNotify,
};
