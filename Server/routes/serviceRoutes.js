// serviceRoutes.js
const express = require("express");
const verifyToken = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const {
  createService,
  getServicesByCategory,
  getServicesByCategoryAndSubcategory,
  getAllServices,
  getServiceByCategorySubcategoryAndId,
  getAllCategories,
  getRandomServiceByCategory,
  getServiceByBusniess,
  updateService,
  deleteService,
  getServicesCreateDate,
  getAllServiceAddresses,
  searchServices,
  getUserServices,
  getAllServicesBusiness,
} = require("../controllers/serviceController");

const router = express.Router();

router.post(
  "/services-create",
  verifyToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 4 },
  ]),
  createService
);
router.put(
  "/services-edit/",
  verifyToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 5 },
  ]),
  updateService
);
router.delete("/services-delete", verifyToken, deleteService);
router.get("/services/category/:category", getServicesByCategory);
router.get(
  "/services/:category/:subcategory",
  getServicesByCategoryAndSubcategory
);
router.get("/all-services", getAllServices);
router.get(
  "/services/:category/:subcategory/:id",
  getServiceByCategorySubcategoryAndId
);
router.get("/categories", getAllCategories);
router.get("/random/:category", getRandomServiceByCategory);
router.get("/services/businesses/", verifyToken, getServiceByBusniess);
router.get("/creatAt", getServicesCreateDate);
router.get("/services/addresses", getAllServiceAddresses);
router.post("/services/search", searchServices);
router.get("/allreviewReplay", verifyToken, getUserServices);
router.get("/allreviewReplayBusiness", getAllServicesBusiness);

module.exports = router;
