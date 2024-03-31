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
  , validateRegisterUser
} = require('../models/userModel');
const asyncHandler = require("express-async-handler");


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
    password: hashedPassword,
    fatherName: req.body.fatherName,
    motherName: req.body.motherName,
    bloodType: req.body.bloodType,
    phoneNumber: req.body.phoneNumber,
    birthDate: req.body.birthDate,
    NationalID: req.body.NationalID,
  });

  const result = await user.save();
  res.status(201).json({
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
      NationalID: result.NationalID
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
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
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



//update prfole
const updateProfileController = async (req, res) => {
  try {
    const {userName, fatherName, motherName, bloodType, phoneNumber, birthDate, NationalID } = req.body;
    const email = req.headers['email'];
    const password = req.headers['password'];
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findOneAndUpdate({
      email: email
    }, {
      userName: userName,
      fatherName: fatherName,
      motherName: motherName,
      bloodType: bloodType,
      phoneNumber: phoneNumber,
      birthDate: birthDate,
      NationalID: NationalID,
      password: hashedPassword
    }, { new: true });

    res.status(200).send({
      status: true,
      message: "تم تحديث الملف الشخصي بنجاح",
      user


    });

  } catch (error) {
    console.log(error);
    res.status(200).send({
      status: false,
      message: "خطأ في عملية تحديث الملف الشخصي",
      error,
    });
  }

};


const getUserProfile = async (req, res) => {
  try {
    const email = req.headers['email'];
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(200).send({
        status: false,
        message: "المستخدم غير مسجل",
      });
    }

    res.status(200).send({
      status: true,
      message: "تم العثور على الملف الشخصي",
      user
    });

}catch (error) {
  console.log(error);
  res.status(200).send({
    status: false,
    message: "خطأ في عملية البحث عن الملف الشخصي",
    error,
  });
}
};



module.exports = { loginController, registerController , updateProfileController , getUserProfile };





