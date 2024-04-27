const express = require('express')
const router = express.Router();
const asyncHandler = require("express-async-handler")
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')
const {getUserProfile} = require('../Controllers/profileController');
const { body } = require('express-validator');
const {loginAdmin} = require('../Controllers/adminController');




router.post("/loginAdmin" , loginAdmin);

module.exports = router;