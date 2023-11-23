const express = require('express')
const router = express.Router();
const asyncHandler = require("express-async-handler")
const {registerController,loginController
    , forgotPasswordController
} = require('../Controllers/authController');
const { body } = require('express-validator');


//register router
router.post('/register' , registerController);
// login router 
router.post('/login',loginController)

// forgot password router
router.post('/forgotPassword',forgotPasswordController)

module.exports = router ;