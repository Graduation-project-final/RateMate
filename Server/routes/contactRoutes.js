const express = require("express");
const router = express.Router();
const contactController = require("../controllers/ContactController");

router.get("/contacts", contactController.getContacts);
router.put("/contacts/:id", contactController.updateContact);

module.exports = router;
