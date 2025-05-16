const express = require("express");
const router = express.Router();
const contactMessagesController = require("../controllers/contactMessagesController");

router.post("/createMessage", contactMessagesController.create);

router.get("/getAllMessage", contactMessagesController.getAll);

router.post("/replyToUser", contactMessagesController.replyToUser);

module.exports = router;
