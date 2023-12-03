const express = require("express");
const router = express.Router();
require('dotenv').config();
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");


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
      message: "this user already registered"
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
    NationalID: req.body.NationalID
  });

  const result = await user.save();
  res.status(201).json({
    status: "true",
    message: "user created successfully",
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
      return res.status(404).send({
        status: "false",
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User is not registerd",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(200).send({
        status: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      status: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error in login",
      error,
    });
  }
};

module.exports = { loginController, registerController };

