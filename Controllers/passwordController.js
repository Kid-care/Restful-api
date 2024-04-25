const asyncHandler = require("express-async-handler");
const { User, validateChangePassword } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { comparePassword, hashPassword } = require("../helpers/authHelper");

const { getUserFromToken } = require('../helpers/getuserfromToken');
const { text } = require("express");

/**
 *  @desc    Send Forgot Password Link
 *  @route   /password/forgot-password
 *  @method  POST
 *  @access  public
 */


const sendForgotPasswordLink = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "المستخدم غير موجود" });
  }

  const roles = user.roles;

  const token = await jwt.sign({
    "userInfo": {
      "username": user.userName,
      "roles": roles
    }, _id: user._id

  }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });


  const link = `http://localhost:3000/password/reset-password/${token}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    }
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: "Reset Password",
    text: `Hi ${user.userName}, Click on the link below to reset your password ${link}`
  }

  transporter.sendMail(mailOptions, function (error, success) {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "حدث خطأ ما" });
    } else {
      console.log("Email sent: " + success.response);

    }
  });

  res.status(200).json({ message: "تم إرسال الرابط بنجاح" });

};

/**
 *  @desc    Reset The Password
 *  @route   /password/reset-password/:token
 *  @method  POST
 *  @access  public
 */

const resetThePassword = async (req, res) => {
  const { error } = validateChangePassword(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let userId;
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    userId = decoded._id;
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'التوكن غير صالح' });
  }

  // Find the user by ID
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'المستخدم غير موجود' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'تم تغيير كلمة المرور بنجاح' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

};


module.exports = { sendForgotPasswordLink, resetThePassword };