const multer = require("multer");
const path = require("path");

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const productFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "Only image files are allowed!"
      )
    );
  }
};

const upload = multer({
  storage: productStorage,
  fileFilter: productFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB
  },
});

// Wrap the fields middleware with error handling
const productUpload = (req, res, next) => {
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 4 },
  ])(req, res, (err) => {
    console.log("Files received:", req.files);
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          error: "File upload error",
          message:
            err.code === "LIMIT_UNEXPECTED_FILE"
              ? "Invalid file field name or type"
              : err.message,
        });
      }
      return res.status(400).json({
        error: "File validation error",
        message: err.message,
      });
    }
    next();
  });
};

module.exports = productUpload;
