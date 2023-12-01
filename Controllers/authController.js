const express = require("express");
const router  = express.Router() ;
require('dotenv').config();
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const { comparePassword, hashPassword } = require("../helpers/authHelper");
const bcrypt = require("bcrypt");
const {User
    ,validateRegisterUser
    } = require('../models/userModel');
    const asyncHandler = require("express-async-handler");


//register controller
const registerController = asyncHandler(async(req,res)=>{
    const { error }  = validateRegisterUser(req.body); 
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({message : "this user already registered"})
    }

    user = new User({
        email : req.body.email ,
        userName : req.body.userName ,
        password : req.body.password,
        fatherName : req.body.fatherName,
        motherName : req.body.motherName,
        bloodType : req.body. bloodType,
        phoneNumber: req.body.phoneNumber,
        birthDate : req.body.birthDate,
        NationalID: req.body.NationalID 
    });

   const result  =  await user.save();
   res.status(201).json(result);
});


// login

const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      //check user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User is not registerd",
        });
      }
       
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET,{
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
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
        success: false,
        message: "Error in login",
        error,
      });
    }
  };

  module.exports={loginController, registerController};

  