const asyncHandler = require("express-async-handler");
const { User, validateChangePassword } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { comparePassword, hashPassword } = require("../helpers/authHelper");

/**
 *  @desc    Get Forgot Password View
 *  @route   /password/forgot-password
 *  @method  GET
 *  @access  public
 */

module.exports.getForgotPasswordView = asyncHandler((req, res) => {
  // res.render("forgot-password");
});


/**
 *  @desc    Send Forgot Password Link
 *  @route   /password/forgot-password
 *  @method  POST
 *  @access  public
 */

module.exports.sendForgotPasswordLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "المستخدم غير موجود" });
  }

  const secret = process.env.JWT_SECRET + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "10m",
  });

  const link = `https://localhost:3000/password/reset-password/${user._id}/${token}`;
 // res.json({message:'Click on the link', resetPasswordLink: link});
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
     html: `<div>
               <h4> Hi ${user.userName}, Click on the link below to reset your password </h4>
               <p>${link}</p>
           </div>`
   }

   transporter.sendMail(mailOptions, function(error, success){
     if(error){
       console.log(error);
       res.status(500).json({message: "حدث خطأ ما"});
     } else {
       console.log("Email sent: " + success.response);
       
     }
   });

   res.status(200).json({message: "تم إرسال الرابط بنجاح"});
  //  res.render("link-send");
 });


/**
 *  @desc    Get Reset Password View
 *  @route   /password/reset-password/:userId/:token
 *  @method  GET
 *  @access  public
 */

module.exports.getResetPasswordView = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "المستخدم غير موجود" });
  }

  const secret = process.env.JWT_SECRET + user.password;
  try {
    jwt.verify(req.params.token, secret); // if token is expired it will throw an error
    res.status(200).json({ message: "Message from server" });
    // res.render("reset-password", { email: user.email });  
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
});

/**
 *  @desc    Reset The Password
 *  @route   /password/reset-password/:userId/:token
 *  @method  POST
 *  @access  public
 */

module.exports.resetThePassword = asyncHandler(async (req, res) => {
  const { error } = validateChangePassword(req.body);
   if(error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "المستخدم غير موجود" });
  }

  const secret = process.env.JWT_SECRET + user.password;
  try {
    jwt.verify(req.params.token, secret); // if token is expired it will throw an error

    const salt = await bcrypt.genSalt(10); // generate salt
    req.body.password = await bcrypt.hash(req.body.password, salt);
    user.password = req.body.password;
    await user.save();
    res.status(200).json({ message: "تم تغيير كلمة المرور بنجاح" });
    // res.render("success-password");
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
})

