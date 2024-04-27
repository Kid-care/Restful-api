const express = require("express");
const router = express.Router();
require('dotenv').config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const { verifyToken } = require("../middleware/verifyToken");


const { comparePassword, hashPassword } = require("../helpers/authHelper");
const bcrypt = require("bcrypt");
const { User, validateRegisterUser } = require('../models/userModel');
const {Admin, validateRegisterAdmin} = require('../models/adminModel');
const {Owner, validateRegisterOwner, validateLoginOwner} = require('../models/ownerModel');
const asyncHandler = require("express-async-handler");

const getUserFromToken = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded._id;
    return await User.findById(id);
};

const getOwnerFromToken = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded._id;
    return await Owner.findById(id);
};


const getAdminFromToken = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded._id;
    return await Admin.findById(id);
}

module.exports = {getUserFromToken , getOwnerFromToken , getAdminFromToken};

