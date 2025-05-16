const { Report, Services } = require("../models");

const createReport = async (req, res) => {
  try {
    const { serviceId, description } = req.body;
    const userId = req.userId;

    if (!serviceId || !description) {
      return res
        .status(400)
        .json({ message: "Service ID and description are required." });
    }

    const service = await Services.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    const newReport = await Report.create({
      userId,
      serviceId,
      description,
    });

    return res
      .status(201)
      .json({ message: "Report submitted successfully.", report: newReport });
  } catch (error) {
    console.error("Error creating report:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  createReport,
};
