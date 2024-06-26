const express = require("express");
const router = express.Router();
require('dotenv').config();
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer =require("multer");
const path = require("path");
const {verifyToken} = require("../middleware/verifyToken");


const { comparePassword, hashPassword } = require("../helpers/authHelper");
const bcrypt = require("bcrypt");
const { User
  , validateRegisterUser , validateLoginUser
} = require('../models/userModel');
const {Admin , validateRegisterAdmin , validateLoginAdmin} = require('../models/adminModel');
const { Owner, validateRegisterOwner, validateLoginOwner } = require('../models/ownerModel');
const asyncHandler = require("express-async-handler");
const isAdmin = require("../middleware/isAdmin");
const { userInfo } = require("os");


//register controller
const registerController = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({
      status: "false",
      message: error.details[0].message
    });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({
      status: "false",
      message: "هذا المستخدم مسجل بالفعل"
    })
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    email: req.body.email,
    userName: req.body.userName,
    roles: req.body.roles || 'user',
    password: hashedPassword,
    fatherName: req.body.fatherName,
    motherName: req.body.motherName,
    bloodType: req.body.bloodType,
    phoneNumber: req.body.phoneNumber,
    birthDate: req.body.birthDate,
    NationalID: req.body.NationalID,
  });

  const result = await user.save();
  res.status(200).json({
    status: "true",
    message: "تم إنشاء المستخدم بنجاح",
    user: {
      _id: result._id,
      email: result.email,
      userName: result.userName,
      password: result.password,
      fatherName: result.fatherName,
      motherName: result.motherName,
      bloodType: result.bloodType,
      phoneNumber: result.phoneNumber,
      birthDate: result.birthDate,
      NationalID: result.NationalID,
      roles : result.roles
    }
  });
});


// login

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(200).send({
        status: "false",
        message: "البريد الإلكتروني أو كلمة المرور غير صالحة",
      });
    }
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).send({
        status: false,
        message: "المستخدم غير مسجل",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(200).send({
        status: false,
        message: "كلمة المرور غير صالحة",
      });
    }

    const roles = user.roles;
    //token

    const token = await JWT.sign({
      "userInfo":{
        "username": user.userName,
        "roles":roles
      }, _id: user._id 

    }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      status: true,
      message: "تم تسجيل الدخول بنجاح",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email, 
        phoneNumber: user.phoneNumber,
        roles : user.roles
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      status: false,
      message: "خطأ في عملية تسجيل الدخول",
      error,
    });
  }
};


const loginAll = asyncHandler(async (req, res) => {
  const { error1 } = validateLoginAdmin(req.body);
  const { error2 } = validateLoginOwner(req.body);
  const { error3 } = validateLoginUser(req.body);

  if (error1 && error2 && error3) {
    const errorMessage = error1?.details[0]?.message || error2?.details[0]?.message || error3?.details[0]?.message;
    return res.status(400).json({
      status: false,
      message: errorMessage
    });
  }

  const [admin, owner, user] = await Promise.all([
    Admin.findOne({ email: req.body.email }),
    Owner.findOne({ email: req.body.email }),
    User.findOne({ email: req.body.email })
  ]);

  if (!admin && !owner && !user) {
    return res.status(400).json({
      status: false,
      message: "الايميل خاطئ"
    });
  }

  const loginUser = async (user) => {
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        status: false,
        message: "كلمة المرور خاطئة"
      });
    }
    const token = JWT.sign({ _id: user._id, roles: user.roles }, process.env.JWT_SECRET);
    return res.status(200).json({
      status: true,
      message: "تم تسجيل الدخول بنجاح",
      user: {
        _id: user._id,
        email: user.email,
        roles: user.roles
      },
      token
    });
  };

  if (admin) return loginUser(admin);
  if (owner) return loginUser(owner);
  if (user) return loginUser(user);
});

module.exports = { loginController, registerController , loginAll};
