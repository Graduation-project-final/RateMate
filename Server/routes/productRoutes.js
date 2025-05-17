const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  approveProduct,
  getApprovedProducts,
  getApprovedProductById,
  getUserProducts,
} = require("../controllers/productController");
const verifyToken = require("../middlewares/auth");
const productUpload = require("../utils/productUpload");

router.post("/products-create", verifyToken, productUpload, createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id/approve", approveProduct);
router.get("/products/approved", getApprovedProducts);
router.get("/products/approved/:id", getApprovedProductById);
router.get("/products/my", verifyToken, getUserProducts);

module.exports = router;
