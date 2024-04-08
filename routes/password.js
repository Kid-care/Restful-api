const express = require("express");
const {
  getForgotPasswordView,
  sendForgotPasswordLink,
  getResetPasswordView,
  resetThePassword,
} = require("../Controllers/passwordController");

const router = express.Router();

// /password/forgot-password
router
  .route("/forgot-password")
  .get(getForgotPasswordView)
  .post(sendForgotPasswordLink);


// /password/reset-password/:userId/:token
router.route("/reset-password/:token")
  .get(getResetPasswordView)
  .post(resetThePassword)

module.exports = router;