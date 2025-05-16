const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");
const verifyToken = require("../middlewares/auth");
const productUpload = require("../utils/productUpload");

router.post("/products-create", verifyToken, productUpload, createProduct);

module.exports = router;
