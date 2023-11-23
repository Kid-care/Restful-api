const express = require('express')
const router = express.Router();
const asyncHandler = require("express-async-handler")
const {registerController} = require('../Controllers/authController');
const { body } = require('express-validator');


//register router
router.post('/register' , registerController);

module.exports = router ;