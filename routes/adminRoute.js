const express = require('express')
const router = express.Router();
const asyncHandler = require("express-async-handler")
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')
const {getUserProfile, getAllUsers , createUser , getUser , addData , deleteData , updateUserData} = require('../Controllers/profileController');
const { body } = require('express-validator');




// Admin route to view userProfile (requires admin role)
router.get('/Admin', verifyRoles(ROLES_LIST.Admin), adminController.getUser);

// Admin route to add in userProfile (requires admin role)
router.post('/Admin', verifyRoles(ROLES_LIST.Admin), adminController.addData);

// Admin route to delete in userProfile (requires admin role)
router.delete('/Admin', verifyRoles(ROLES_LIST.Admin), adminController.deleteData);

// Admin route to update in userProfile (requires admin role)
router.put('/Admin', verifyRoles(ROLES_LIST.Admin), adminController.updateUserData);

module.exports = router;
