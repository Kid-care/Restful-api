const express = require('express')
const router = express.Router();
const asyncHandler = require("express-async-handler")
const {getUserProfile , updateUserProfile} = require('../Controllers/profileController');
const { body } = require('express-validator');



// get user profile
router.get("/getprofile", getUserProfile);

// update user profile
router.post("/updateprofile", updateUserProfile);


module.exports = router;