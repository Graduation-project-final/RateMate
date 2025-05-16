const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateOTP = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpToken = jwt.sign({ otp, email }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  return { otp, otpToken };
};

module.exports = { generateOTP };
