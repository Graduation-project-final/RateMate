const { Product, User } = require("../models");
const { sendEmail } = require("../utils/emailUtils");

const createProduct = async (req, res) => {
  try {
    const userId = req.userId;

    const productCount = await Product.count({ where: { userId } });

    if (productCount >= 2) {
      return res.status(403).json({
        message: "You can only create up to 2 products.",
      });
    }

    if (!req.files || !req.files.mainImage) {
      return res.status(400).json({ message: "Main image is required" });
    }

    const { title, category, description, productUrl } = req.body;

    const mainImage = req.files.mainImage[0].path;
    const subImages = req.files.subImages?.map((file) => file.path) || [];

    const newProduct = await Product.create({
      userId,
      title,
      category,
      description,
      productUrl: productUrl || null,
      mainImage,
      subImages,
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Error retrieving products",
      error: error.message,
    });
  }
};

const approveProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByPk(productId, {
      include: {
        model: User,
        as: "user",
        attributes: ["email"],
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.status = "approved";
    await product.save();

    const subject = "Your product has been approved on RateMate!";
    const message = `Hi,\n\nYour product "${product.title}" has been approved and is now live on RateMate.\n\nThank you for using RateMate!`;

    await sendEmail(product.user?.email, subject, message);

    res.status(200).json({
      message: "Product approved and email sent successfully",
      product,
    });
  } catch (error) {
    console.error("Error approving product:", error);
    res.status(500).json({
      message: "An error occurred while approving the product",
      error: error.message,
    });
  }
};

const getApprovedProducts = async (req, res) => {
  try {
    const approvedProducts = await Product.findAll({
      where: { status: "approved" },
    });

    res.status(200).json({
      message: "Approved products retrieved successfully",
      products: approvedProducts,
    });
  } catch (error) {
    console.error("Error fetching approved products:", error);
    res.status(500).json({
      message: "Error retrieving approved products",
      error: error.message,
    });
  }
};

const getApprovedProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findOne({
      where: { id: productId, status: "approved" },
    });

    if (!product) {
      return res.status(404).json({ message: "Approved product not found" });
    }

    res.status(200).json({
      message: "Approved product retrieved successfully",
      product,
    });
  } catch (error) {
    console.error("Error fetching approved product by ID:", error);
    res.status(500).json({
      message: "Error retrieving approved product",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  approveProduct,
  getApprovedProducts,
  getApprovedProductById,
};
