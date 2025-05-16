const { User } = require("../models");

exports.verifyOTPService = async (email, otp) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { error: true, status: 404, message: "User not found" };
    }

    if (user.otp !== otp) {
      return { error: true, status: 400, message: "Invalid OTP" };
    }

    if (new Date() > new Date(user.otpExpires)) {
      return { error: true, status: 400, message: "OTP expired" };
    }

    user.isActive = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return { error: false, message: "OTP verified successfully", user };
  } catch (error) {
    console.error("Error in verifyOTPService: ", error);
    throw new Error("Internal server error");
  }
};
