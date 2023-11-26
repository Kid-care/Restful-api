const express = require('express')
const router = express.Router();
const asyncHandler = require("express-async-handler")
const { loginController , 
    registerController,
    forgotPasswordController,
    getresetPasswordController,
    postresetPasswordController
    } = require('../Controllers/authController');
const { body } = require('express-validator');


//register router
router.post('/register' , registerController);
// login router 
router.post('/login',loginController)

// forgot password router
router.post('/forgotPassword',forgotPasswordController)

// forgot password router
router.post('/forgotpassword', forgotPasswordController);

// reset password router
router.get('/resetpassword/:userId/:token', getresetPasswordController);

// reset password router
router.post('/resetpassword/:userId/:token', postresetPasswordController);

module.exports = router ;