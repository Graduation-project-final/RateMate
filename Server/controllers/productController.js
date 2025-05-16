const { Product } = require("../models");

const createProduct = async (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || !req.files.mainImage) {
      return res.status(400).json({ message: "Main image is required" });
    }

    const { title, category, description, productUrl } = req.body;
    const userId = req.userId;

    // Get file paths
    const mainImage = req.files.mainImage[0].path;
    const subImages = req.files.subImages?.map((file) => file.path) || [];

    // Create product logic...
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

module.exports = { createProduct };
