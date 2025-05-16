const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const { generateOTP } = require("../utils/otpUtils");
const { sendEmail } = require("../utils/emailUtils");
const { verifyOTPService } = require("../services/authService");
const { generateResetToken } = require("../utils/resetTokenUtils");

exports.register = async (req, res) => {
  const { name, email, password, phoneNumber, businessName, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { otp, otpToken } = generateOTP(email);
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    const selectedRole = role || "user";

    let newUser;
    if (selectedRole === "business") {
      if (!phoneNumber || !businessName) {
        return res.status(400).json({
          message:
            "Phone number and business name are required for business registration.",
        });
      }
      newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "business",
        status: "pending",
        isActive: false,
        otp,
        otpExpires,
        phoneNumber,
        businessName,
      });
    } else {
      newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "user",
        status: "pending",
        isActive: false,
        otp,
        otpExpires,
      });
    }

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role, isActive: newUser.isActive },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    const subject = "Your OTP Code";
    const message = `Your OTP code is ${otp}. It will expire in 5 minutes.`;
    await sendEmail(email, subject, message);

    res.status(201).json({
      message: "User registered. OTP sent to email.",
      otpToken,
      token,
    });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const result = await verifyOTPService(email, otp);

    if (result.error) {
      return res.status(result.status).json({ message: result.message });
    }

    const { user } = result;

    if (!user || !user.id || !user.role || user.isActive === undefined) {
      return res
        .status(500)
        .json({ message: "User information is incomplete" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, isActive: user.isActive },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.status(200).json({
      message: result.message,
      token,
    });
  } catch (error) {
    console.error("Error verifying OTP: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(400).json({ message: "Account not activated" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, iaActive: user.isActive },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error logging in user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateResetToken();
    const resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000); 

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/set-new-password?token=${resetToken}`;
    const subject = "Password Reset Request";
    const message = `To reset your password, please click the following link: ${resetLink}. This link will expire in 15 minutes.`;

    await sendEmail(email, subject, message);

    res.status(200).json({ message: "Password reset link sent to email." });
  } catch (error) {
    console.error("Error requesting password reset: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      where: { resetToken: token, resetTokenExpires: { [Op.gt]: new Date() } },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isActive) {
      return res.status(400).json({ message: "Account already activated" });
    }

    const { otp, otpToken } = generateOTP(email);
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const subject = "Your New OTP Code";
    const message = `Your new OTP code is ${otp}. It will expire in 5 minutes.`;
    await sendEmail(email, subject, message);

    res.status(200).json({
      message: "New OTP sent to email.",
      otpToken,
    });
  } catch (error) {
    console.error("Error resending OTP: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(400).json({ message: "Account not activated" });
    }

    if (user.role !== "admin" && user.role !== "business") {
      return res
        .status(403)
        .json({ message: "Access denied. Not an admin or business." });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, isActive: user.isActive },
      process.env.JWT_SECRET,
      { expiresIn: "1w" }
    );

    res.status(200).json({
      message: "Admin/Business login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Error during admin/business login: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
