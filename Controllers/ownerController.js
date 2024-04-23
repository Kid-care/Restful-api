const express = require("express");
const router = express.Router();
require('dotenv').config();
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const { verifyToken } = require("../middleware/verifyToken");

const joi = require("joi");
const { comparePassword, hashPassword } = require("../helpers/authHelper");
const bcrypt = require("bcrypt");
const { User, validateRegisterUser } = require('../models/userModel');
const { Admin, validateRegisterAdmin } = require('../models/adminModel');
const asyncHandler = require("express-async-handler");
const {getUserFromToken} = require("../helpers/getuserfromToken");
const mongoose = require('mongoose');


// add Admin 

const addAdmin = asyncHandler(async (req, res) => {
    const token = req.headers['authorization'];

    if(!token) {
        return res.status(401).send({
            status: false,
            message: "توكن مفقود",
        });
    }

    const owner = await getUserFromToken(token);

    if(!owner) {
        return res.status(404).send({
            status: false,
            message: "ال owner غير موجود",
        });
    }

    if(owner.roles !== "owner") {
        return res.status(403).send({
            status: false,
            message: "غير مسموح لك بإضافة ادمن",
        });
    }

    const { error } = validateRegisterAdmin(req.body);

    if(error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        });
    }

    let admin = await Admin.findOne({ email: req.body.email });

    if(admin) {
        return res.status(400).json({
            status: false,
            message: "هذا الادمن مسجل بالفعل"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    admin = new Admin({
        email: req.body.email,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword,
        city: req.body.city,
        specialization: req.body.specialization,
    });

    const result = await admin.save();

    res.status(201).json({
        status: true,
        message: "تم إنشاء الادمن بنجاح",
        admin: {
            _id: result._id,
            email: result.email,
            name: result.name,
            phoneNumber: result.phoneNumber,
            city: result.city,
            specialization: result.specialization,
            role : result.role
        }
    });
});

// update admin
const updateAdmin = asyncHandler(async (req, res) => {
    const token = req.headers['authorization'];

    if(!token) {
        return res.status(401).send({
            status: false,
            message: "توكن مفقود",
        });
    }

    const owner = await getUserFromToken(token);

    if(!owner) {
        return res.status(404).send({
            status: false,
            message: "ال owner غير موجود",
        });
    }

    if(owner.roles !== "owner") {
        return res.status(403).send({
            status: false,
            message: "غير مسموح لك بإضافة ادمن",
        });
    }

    const { error } = validateRegisterAdmin(req.body);

    if(error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        });
    }

    let admin = await Admin.findOne({ email: req.body.email });

    if(!admin) {
        return res.status(404).json({
            status: false,
            message: "هذا الادمن غير موجود"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    admin.email = req.body.email;
    admin.name = req.body.name;
    admin.phoneNumber = req.body.phoneNumber;
    admin.password = hashedPassword;
    admin.city = req.body.city;
    admin.specialization = req.body.specialization;

    const result = await admin.save();

    res.status(201).json({
        status: true,
        message: "تم تحديث الادمن بنجاح",
        admin: {
            _id: result._id,
            email: result.email,
            name: result.name,
            phoneNumber: result.phoneNumber,
            city: result.city,
            specialization: result.specialization,
            role : result.role
        }
    });

});
 
// delete admin

const deleteAdmin = asyncHandler(async (req, res) => {
    const token = req.headers['authorization'];

    if(!token) {
        return res.status(401).send({
            status: false,
            message: "توكن مفقود",
        });
    }

    const owner = await getUserFromToken(token);

    if(!owner) {
        return res.status(404).send({
            status: false,
            message: "ال owner غير موجود",
        });
    }

    if(owner.roles !== "owner") {
        return res.status(403).send({
            status: false,
            message: "غير مسموح لك بإضافة ادمن",
        });
    }

    let admin = await Admin.findOne({ email: req.body.email });

    if(!admin) {
        return res.status(404).json({
            status: false,
            message: "هذا الادمن غير موجود"
        })
    }

    await Admin.findByIdAndDelete(admin._id);

    res.status(200).json({
        status: true,
        message: "تم حذف الادمن بنجاح",
    });

})




const UserCount = async (req , res) => {
    const num = await User.find().count();
    res.status(200).json({
        status: true,
        message: "عدد المستخدمين",
        num
    });

}

const AdminCount = async (req , res) => {
    const num = await Admin.find().count();
    res.status(200).json({
        status: true,
        message: "عدد الدكتورز",
        num
    });

}

module.exports = {addAdmin , updateAdmin , deleteAdmin , UserCount , AdminCount};


