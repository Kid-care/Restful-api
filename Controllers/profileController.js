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




// get user data

const getUserProfile = async (req, res) => {
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


const updateUserProfile = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send({
                status: false,
                message: "توكن مفقود",
            });
        }

        const user = await getUserFromToken(token);

        // console.log(user);

        if (!user) {
            return res.status(404).send({
                status: false,
                message: "المستخدم غير مسجل",
            });
        }

        const {userName, fatherName, motherName, bloodType, phoneNumber, birthDate, NationalID} = req.body;

        const updatedUser = await User.findByIdAndUpdate({
            _id: user._id
          }, {
            userName: userName,
            fatherName: fatherName,
            motherName: motherName,
            bloodType: bloodType,
            phoneNumber: phoneNumber,
            birthDate: birthDate,
            NationalID: NationalID
          }, { new: true });

        res.status(200).send({
            status: true,
            message: "تم تحديث الملف الشخصي بنجاح",
            user : updatedUser
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

const adminGetUserData = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send({
                status: false,
                message: "توكن مفقود",
            });
        }

        const admin = await getAdminFromToken(token);

        if (!admin) {
            return res.status(404).send({
                status: false,
                message: "غير مسموح لك بالوصول",
            });
        }

        const id = req.headers['id'];

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({
                status: false,
                message: "المستخدم غير موجود",
            });
        }

        res.status(200).send({
            status: true,
            message: "تم العثور على المستخدم",
            user
        });
    } catch (err) {
        console.log(err);
    }
};
module.exports = { getUserProfile , updateUserProfile , adminGetUserData};





