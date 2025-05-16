const { Services, Reply, Review, User, UserProfile } = require("../models");
const { Op, Sequelize, fn, col } = require("sequelize");

const createService = async (req, res) => {
  try {
    const { title, category, subcategory, address, description, contact } =
      req.body;
    const userId = req.userId;

    if (
      !req.files ||
      !req.files.mainImage ||
      req.files.mainImage.length === 0
    ) {
      return res.status(400).json({ message: "Main image is required." });
    }

    const mainImage = req.files.mainImage[0].path;
    const subImages = req.files.subImages
      ? req.files.subImages.map((file) => file.path)
      : [];

    const newService = await Services.create({
      userId,
      title,
      category,
      subcategory: subcategory || null,
      address,
      description,
      contact,
      mainImage,
      subImages,
    });

    res.status(201).json({
      message: "Service created successfully",
      service: newService,
    });
  } catch (error) {
    console.error("Service creation error:", error);
    res
      .status(500)
      .json({ message: "Error creating service", error: error.message });
  }
};

const getServicesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const services = await Services.findAll({
      where: { category },
    });

    if (services.length === 0) {
      return res
        .status(404)
        .json({ message: "No services found for this category." });
    }

    res.status(200).json(services);
  } catch (error) {
    console.error("Error retrieving services:", error);
    res
      .status(500)
      .json({ message: "Error retrieving services", error: error.message });
  }
};

const getServicesByCategoryAndSubcategory = async (req, res) => {
  const { category, subcategory } = req.params;

  try {
    const services = await Services.findAll({
      where: {
        category,
        subcategory,
      },
    });

    if (services.length === 0) {
      return res.status(404).json({
        message: "No services found for this category and subcategory.",
      });
    }

    res.status(200).json(services);
  } catch (error) {
    console.error("Error retrieving services:", error);
    res
      .status(500)
      .json({ message: "Error retrieving services", error: error.message });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Services.findAll();

    if (services.length === 0) {
      return res.status(404).json({ message: "No services found." });
    }

    res.status(200).json(services);
  } catch (error) {
    console.error("Error retrieving services:", error);
    res
      .status(500)
      .json({ message: "Error retrieving services", error: error.message });
  }
};

const getServiceByCategorySubcategoryAndId = async (req, res) => {
  const { category, subcategory, id } = req.params;

  try {
    const service = await Services.findOne({
      where: {
        id,
        category,
        subcategory,
      },
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("Error retrieving service:", error);
    res
      .status(500)
      .json({ message: "Error retrieving service", error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const services = await Services.findAll({
      attributes: ["category", "subcategory"],
      group: ["category", "subcategory"],
    });

    // Format the response
    const categories = services.map((service) => ({
      name: service.category,
      subcategories: service.subcategory ? [service.subcategory] : [],
    }));

    // Create unique categories with subcategories
    const formattedCategories = categories.reduce((acc, curr) => {
      const existingCategory = acc.find((cat) => cat.name === curr.name);
      if (existingCategory) {
        if (curr.subcategories.length > 0) {
          existingCategory.subcategories.push(...curr.subcategories);
        }
      } else {
        acc.push({ name: curr.name, subcategories: curr.subcategories });
      }
      return acc;
    }, []);

    res.status(200).json(formattedCategories);
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res
      .status(500)
      .json({ message: "Error retrieving categories", error: error.message });
  }
};

const getRandomServiceByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const services = await Services.findAll({
      where: {
        category: category.trim(),
      },
      order: Sequelize.literal("RANDOM()"),
      limit: 3,
    });

    if (services.length === 0) {
      return res
        .status(404)
        .json({ message: "No services found for this category." });
    }

    res.status(200).json(services);
  } catch (error) {
    console.error("Error retrieving random service:", error);
    res.status(500).json({
      message: "Error retrieving random service",
      error: error.message,
    });
  }
};

const getServiceByBusniess = async (req, res) => {
  const userId = req.userId;

  try {
    const services = await Services.findAll({
      where: {
        userId: userId,
      },
    });

    if (services.length === 0) {
      return res
        .status(404)
        .json({ message: "No services found for this user." });
    }

    res.status(200).json(services);
  } catch (error) {
    console.error("Error retrieving services for user:", error);
    res.status(500).json({
      message: "Error retrieving services for user",
      error: error.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { title, category, subcategory, address, description, contact, id } =
      req.body;
    const serviceId = id;
    const userId = req.userId;

    const service = await Services.findOne({ _id: serviceId, userId });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (title) service.title = title;
    if (category) service.category = category;
    if (subcategory) service.subcategory = subcategory;
    if (address) service.address = address;
    if (description) service.description = description;
    if (contact) service.contact = contact;

    if (req.files && req.files.mainImage) {
      service.mainImage = req.files.mainImage[0].path;
    }

    if (req.files && req.files.subImages) {
      service.subImages = req.files.subImages.map((file) => file.path);
    }

    await service.save();

    res.status(200).json({
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Service update error:", error);
    res
      .status(500)
      .json({ message: "Error updating service", error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.body; // Get service ID from the body
    const userId = req.userId;

    if (!id) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    const service = await Services.findOne({ _id: id, userId });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await service.destroy();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Service deletion error:", error);
    res
      .status(500)
      .json({ message: "Error deleting service", error: error.message });
  }
};


const getServicesCreateDate = async (req, res) => {
  try {
    const sortOrder = req.query.sort === "Oldest" ? "ASC" : "DESC";

    const services = await Services.findAll({
      order: [["createdAt", sortOrder]],
    });

    res.status(200).json({
      message: "Services retrieved successfully",
      services,
    });
  } catch (error) {
    console.error("Error retrieving services:", error);
    res
      .status(500)
      .json({ message: "Error retrieving services", error: error.message });
  }
};

const getAllServiceAddresses = async (req, res) => {
  try {
    const addresses = await Services.findAll({
      attributes: ["address"],
    });

    res.status(200).json({
      message: "Addresses retrieved successfully",
      addresses: addresses.map((service) => service.address),
    });
  } catch (error) {
    console.error("Error retrieving addresses:", error);
    res
      .status(500)
      .json({ message: "Error retrieving addresses", error: error.message });
  }
};

const searchServices = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Search query is required." });
    }

    const lowerCaseQuery = query.toLowerCase();

    const services = await Services.findAll({
      where: {
        [Op.or]: [
          Sequelize.where(fn("LOWER", col("title")), {
            [Op.like]: `%${lowerCaseQuery}%`,
          }),
          Sequelize.where(fn("LOWER", col("category")), {
            [Op.like]: `%${lowerCaseQuery}%`,
          }),
          Sequelize.where(fn("LOWER", col("subcategory")), {
            [Op.like]: `%${lowerCaseQuery}%`,
          }),
        ],
      },
    });

    res.status(200).json({
      message: "Services retrieved successfully",
      services,
    });
  } catch (error) {
    console.error("Service search error:", error);
    res
      .status(500)
      .json({ message: "Error searching for services", error: error.message });
  }
};

const getUserServices = async (req, res) => {
  try {
    const userId = req.userId;

    const services = await Services.findAll({
      where: { userId },
      include: [
        {
          model: Review,
          as: "reviews",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name"],
              include: [
                {
                  model: UserProfile,
                  as: "profile",
                  attributes: ["profilePhoto"],
                },
              ],
            },
            {
              model: Reply,
              as: "replies",
              include: [
                {
                  model: User,
                  as: "user",
                  attributes: ["id", "name"],
                  include: [
                    {
                      model: UserProfile,
                      as: "profile",
                      attributes: ["profilePhoto"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (services.length === 0) {
      return res
        .status(404)
        .json({ message: "No services found for this user." });
    }

    res.status(200).json({
      message: "User services retrieved successfully.",
      services,
    });
  } catch (error) {
    console.error("Error fetching user services:", error);
    res
      .status(500)
      .json({ message: "Error fetching user services", error: error.message });
  }
};

const getAllServicesBusiness = async (req, res) => {
  try {
    const services = await Services.findAll({
      include: [
        {
          model: Review,
          as: "reviews",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name"],
              include: [
                {
                  model: UserProfile,
                  as: "profile",
                  attributes: ["profilePhoto"],
                },
              ],
            },
            {
              model: Reply,
              as: "replies",
              include: [
                {
                  model: User,
                  as: "user",
                  attributes: ["id", "name"],
                  include: [
                    {
                      model: UserProfile,
                      as: "profile",
                      attributes: ["profilePhoto"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (services.length === 0) {
      return res.status(404).json({ message: "No services found." });
    }

    res.status(200).json({
      message: "All services retrieved successfully.",
      services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res
      .status(500)
      .json({ message: "Error fetching services", error: error.message });
  }
};

module.exports = {
  createService,
  updateService,
  getServicesByCategory,
  getServicesByCategoryAndSubcategory,
  getAllServices,
  getServiceByCategorySubcategoryAndId,
  getAllCategories,
  getRandomServiceByCategory,
  getServiceByBusniess,
  deleteService,
  getServicesCreateDate,
  getAllServiceAddresses,
  searchServices,
  getUserServices,
  getAllServicesBusiness,
};
