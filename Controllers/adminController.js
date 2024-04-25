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
const asyncHandler = require("express-async-handler");

const {getUserFromToken} = require("../helpers/getuserfromToken");


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



















            
