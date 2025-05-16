const nodemailer = require("nodemailer");
const { ContactMessage } = require("../models");
require("dotenv").config();

const contactMessagesController = {
  async create(req, res) {
    try {
      const { name, email, message } = req.body;
      const newMessage = await ContactMessage.create({ name, email, message });

      await sendReply(email, name, message);

      return res.status(201).json(newMessage);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const messages = await ContactMessage.findAll();
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async replyToUser(req, res) {
    const { id, replyMessage } = req.body;

    try {
      const message = await ContactMessage.findByPk(id);

      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }

      await sendReply(message.email, message.name, replyMessage);

      return res.status(200).json({ message: "Reply sent successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

async function sendReply(userEmail, userName, userReply) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "islamomar0003@gmail.com",
    to: userEmail,
    subject: "Thank You for Your Message",
    text: `Hi ${userName},\n\nThank you for reaching out to us. Here is your reply:\n\n"${userReply}"\n\nWe will get back to you soon!\n\nBest regards,\nYour RateMate`,
  };

  return transporter
    .sendMail(mailOptions)
    .then(() => console.log("Email sent successfully"))
    .catch((error) => console.error("Error sending email:", error));
}

module.exports = contactMessagesController;
