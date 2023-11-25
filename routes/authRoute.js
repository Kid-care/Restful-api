const express = require('express')
const router = express.Router();
const asyncHandler = require("express-async-handler")
const {registerController,loginController} = require('../Controllers/authController');
const { body } = require('express-validator');
// const sendSMS = require('../sendSMS');
const {sendSMS , forgotPasswordController , resetPasswordController} = require('../sendSMS');


//register router
router.post('/register' , registerController);

// login router 
router.post('/login',loginController)

// forget password

router.post('/forgetPass',forgotPasswordController)

// reset password

router.post('/resetPass',resetPasswordController)


module.exports = router ;