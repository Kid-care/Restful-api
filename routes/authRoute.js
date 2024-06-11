const express = require('express')
const router = express.Router();
const asyncHandler = require("express-async-handler")
const {registerController,loginController , loginAll} = require('../Controllers/authController');
const { body } = require('express-validator');

router.post('/register' , registerController);

router.post('/login',loginController);

router.post('/loginAll',loginAll);


module.exports = router ;