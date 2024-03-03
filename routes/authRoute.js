const express = require('express')
const router = express.Router();
const asyncHandler = require("express-async-handler")
const {registerController,loginController , updateProfileController ,getUserProfile , uploadFileController} = require('../Controllers/authController');
const { body } = require('express-validator');


//register router
router.post('/register' , registerController);
// login router 
router.post('/login',loginController)

//update profile
router.put("/updateProfile", updateProfileController);

// get user profile
router.get("/profile", getUserProfile);

// upload file
router.post("/uploadFile", uploadFileController);


module.exports = router ;