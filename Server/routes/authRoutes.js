const express = require("express");
const {
  register,
  verifyOTP,
  login,
  requestPasswordReset,
  resetPassword,
  resendOTP,
  adminLogin,
  googleCallback,
  facebookCallback,
} = require("../controllers/authController");
const router = express.Router();
const passport = require("../passport");

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/reset-password-request", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOTP);
router.post("/admin-login", adminLogin);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  }
);

module.exports = router;
