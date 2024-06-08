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
const { Owner, validateRegisterOwner, validateLoginOwner } = require('../models/ownerModel');
const asyncHandler = require("express-async-handler");
const { getUserFromToken, getOwnerFromToken } = require("../helpers/getuserfromToken");

const moment = require('moment');
const mongoose = require('mongoose');

const { calculateAge } = require('../helpers/calcAge');

// add Admin 

const addAdmin = asyncHandler(async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({
            status: false,
            message: "توكن مفقود",
        });
    }

    const owner = await getOwnerFromToken(token);

    if (!owner) {
        return res.status(404).send({
            status: false,
            message: "ال owner غير موجود",
        });
    }

    if (owner.roles !== "owner") {
        return res.status(403).send({
            status: false,
            message: "غير مسموح لك بإضافة ادمن",
        });
    }

    const { error } = validateRegisterAdmin(req.body);

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        });
    }

    let admin = await Admin.findOne({ email: req.body.email });

    if (admin) {
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
            role: result.role
        }
    });
});

// update admin
const updateAdmin = asyncHandler(async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({
            status: false,
            message: "توكن مفقود",
        });
    }

    const owner = await getOwnerFromToken(token);

    if (!owner) {
        return res.status(404).send({
            status: false,
            message: "ال owner غير موجود",
        });
    }

    if (owner.roles !== "owner") {
        return res.status(403).send({
            status: false,
            message: "غير مسموح لك بإضافة ادمن",
        });
    }

    const { error } = validateRegisterAdmin(req.body);

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        });
    }

    let admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
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
            role: result.role
        }
    });

});

// delete admin

const deleteAdmin = asyncHandler(async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({
            status: false,
            message: "توكن مفقود",
        });
    }

    const owner = await getOwnerFromToken(token);

    if (!owner) {
        return res.status(404).send({
            status: false,
            message: "ال owner غير موجود",
        });
    }

    if (owner.roles !== "owner") {
        return res.status(403).send({
            status: false,
            message: "غير مسموح لك بإضافة ادمن",
        });
    }

    let admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
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


// get all admin users


const getAllAdmins = asyncHandler(async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({
            status: false,
            message: "توكن مفقود",
        });

    }

    const owner = await getOwnerFromToken(token);

    if (!owner) {
        return res.status(404).send({
            status: false,
            message: "ال owner غير موجود",
        });
    }

    if (owner.roles !== "owner") {
        return res.status(403).send({
            status: false,
            message: "غير مسموح لك بالوصول",
        });
    }

    const admins = await Admin.find();

    res.status(200).json({
        status: true,
        message: "كل الادمنز",
        admins
    });

});


const UserCount = async (req, res) => {
    const num = await User.find().count();
    res.status(200).json({
        status: true,
        message: "عدد المستخدمين",
        num
    });

}

const AdminCount = async (req, res) => {
    const num = await Admin.find().count();
    res.status(200).json({
        status: true,
        message: "عدد الدكتورز",
        num
    });

}

// filter cnt age user 0 - 18 , 19 - 35 , 36 - 60 , 61 - infinity

const filterUser = async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({
            status: false,
            message: "توكن مفقود",
        });
    }

    const owner = await getOwnerFromToken(token);

    if (!owner) {
        return res.status(404).send({
            status: false,
            message: "ال owner غير موجود",
        });
    }

    if (owner.roles !== "owner") {
        return res.status(403).send({
            status: false,
            message: "غير مسموح لك بإضافة ادمن",
        });
    }

    let ageGroups = {
        '0-18': 0,
        '19-35': 0,
        '36-60': 0,
        '61-infinity': 0
    };

    const user = mongoose.model('users', new mongoose.Schema({ birthDate: String }));

    const users = await user.find();

    users.forEach(user => {
        let birthDate = moment(user.birthDate, "MM/DD/YYYY");
        let age = moment().diff(birthDate, 'years');

        if (age >= 0 && age <= 18) {
            ageGroups['0-18']++;
        } else if (age >= 19 && age <= 35) {
            ageGroups['19-35']++;
        } else if (age >= 36 && age <= 60) {
            ageGroups['36-60']++;
        } else if (age >= 61) {
            ageGroups['61-infinity']++;
        }
    });

    res.status(200).json({
        status: true,
        message: "عدد المستخدمين",
        ageGroups

    });

}



const registerOwner = asyncHandler(async (req, res) => {
    const { error } = validateRegisterOwner(req.body);

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        });
    }

    let owner = await Owner.findOne({ email: req.body.email });

    if (owner) {
        return res.status(400).json({
            status: false,
            message: "هذا الادمن مسجل بالفعل"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    owner = new Owner({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword,
    });

    const result = await owner.save();

    res.status(201).json({
        status: true,
        message: "تم إنشاء الادمن بنجاح",
        owner: {
            _id: result._id,
            email: result.email,
            name: result.name,
            role: result.role
        }
    });
}
);


// login for owner

const loginOwner = asyncHandler(async (req, res) => {

    const { error } = validateLoginOwner(req.body);

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        });
    }

    let owner = await Owner.findOne({ email: req.body.email });

    if (!owner) {
        return res.status(400).json({
            status: false,
            message: "الايميل خاطئ"
        });
    }

    const validPassword = await bcrypt.compare(req.body.password, owner.password);

    if (!validPassword) {
        return res.status(400).json({
            status: false,
            message: "كلمة المرور خاطئة"
        });
    }

    const token = JWT.sign({ _id: owner._id, roles: owner.roles }, process.env.JWT_SECRET);

    res.header("auth-token", token).status(200).json({
        status: true,
        message: "تم تسجيل الدخول بنجاح",
        token
    });

}
);

module.exports = { addAdmin, updateAdmin, deleteAdmin, UserCount, AdminCount, filterUser, registerOwner, loginOwner , getAllAdmins };
