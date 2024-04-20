const express = require("express");
const {
  sendForgotPasswordLink,
  resetThePassword,
} = require("../Controllers/passwordController");

const router = express.Router();

// /password/forgot-password
router.post('/forgot-password' , sendForgotPasswordLink);

// /password/reset-password/:token
router.post("/reset-password/:token", resetThePassword);

module.exports = router;