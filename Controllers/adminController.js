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
const {Admin , validateRegisterAdmin , validateLoginAdmin} = require('../models/adminModel');
const asyncHandler = require("express-async-handler");

const {getUserFromToken , getAdminFromToken} = require("../helpers/getuserfromToken");
const { resolveNs } = require("dns");


// admin  view userProfile

const viewUserProfile = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send({
                status: false,
                message: "توكن مفقود",
            });
        }

        const user = await getUserFromToken(token);

        if (!user) {
            return res.status(404).send({
                status: false,
                message: "المستخدم غير مسجل",
            });
        }

        res.status(200).send({
            status: true,
            message: "تم العثور على الملف الشخصي",
            user
        });

    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({
                status: false,
                message: "توكن غير صالح",
            });
        }
        res.status(500).send({
            status: false,
            message: "خطأ في عملية البحث عن الملف الشخصي",
            error: error.message,
        });
    }
}; 

// admin add in userProfile

const addInUserProfile = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send({
                status: false,
                message: "توكن مفقود",
            });
        }
        const user = await getUserFromToken(token);
        if (!user) {
            return res.status(404).send({
                status: false,
                message: "المستخدم غير مسجل",
            });
        }
        const {
            name,
            email,
            phone,
            address,
            city,
            country,
            postal_code,
        } = req.body;
        const userUpdate = {
          
        };
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            userUpdate,
            { new: true }
        );
        res.status(200).send({
            status: true,
            message: "تم التعديل على الملف الشخصي",
            user: updatedUser,
        });
        
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({
                status: false,
                message: "توكن غير صالح",
            });
        }
        res.status(500).send({
            status: false,
            message: "خطأ في عملية البحث عن الملف الشخصي",
            error: error.message,
        });
    }
}



// admin Update user profile

const updateInUserProfile = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send({
                status: false,
                message: "توكن مفقود",
            });
        }
        const user = await getUserFromToken(token);
        if (!user) {
            return res.status(404).send({
                status: false,
                message: "المستخدم غير مسجل",
            });
        }
        const {
       
        } = req.body;
        const userUpdate = {
           
        };
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            userUpdate,
            { new: true }
        );
        res.status(200).send({
            status: true,
            message: "تم تحديث الملف الشخصي بنجاح",
            user: updatedUser,
        });
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({
                status: false,
                message: "توكن غير صالح",
            });
        }
        res.status(500).send({
            status: false,
            message: "خطأ في عملية تحديث الملف الشخصي",
            error: error.message,
        });
    }
};


const loginAdmin = asyncHandler(async (req, res) => {


    const { error } = validateLoginAdmin(req.body);

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        });
    }

    let admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
        return res.status(400).json({
            status: false,
            message: "الايميل خاطئ"
        });
    }

    const validPassword = await bcrypt.compare(req.body.password, admin.password);

    if (!validPassword) {
        return res.status(400).json({
            status: false,
            message: "كلمة المرور خاطئة"
        });
    }

    const token = jwt.sign({ _id: admin._id, roles: admin.roles }, process.env.JWT_SECRET);

    res.header("auth-token", token).status(200).json({
        status: true,
        message: "تم تسجيل الدخول بنجاح",
        token
    });

});

module.exports = {loginAdmin: loginAdmin};