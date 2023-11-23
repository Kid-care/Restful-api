const express = require("express");
const router  = express.Router() ;
require('dotenv').config();
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const { comparePassword, hashPassword } = require("../helpers/authHelper");
const bcrypt = require("bcrypt");
const user = require("../models/userModel");
const {userModel
    ,validateRegisterUser
    } = require('../models/userModel');
    const asyncHandler = require("express-async-handler");
const e = require("express");

//register controller
const registerController = asyncHandler(async(req,res)=>{
    const { error }  = validateRegisterUser(req.body); 
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    let user = await userModel.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({message : "this user already registered"})
    }

    user = new userModel({
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
      const { phoneNumber, password } = req.body;
      //validation
      if (!phoneNumber || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      //check user
      const user = await userModel.findOne({ phoneNumber });
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

  // send reset password mail
  const sendresetpasswordmail  = async ( userName,email , userId , code )=>{
    try{
  //pasword controller
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Password",

    text: `Hi ${userName} , ${code} is your KID_CARE verification code.`,
  };
   
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
    } catch{
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in sending mail",
        error,
      });
    }
   }

   const forgotPasswordController = async(req,res)=>{
    try{
       const email = req.body.email;
       const  userdate = await userModel.findOne({email:email})
        if(!userdate){
          res.status(200).send({
            success: false,
            message: "Email is not registerd",
          });
        }
        const secret = process.env.JWT_SECRET + userdate.password;
        const code = (Math.floor(100000 + Math.random() * 900000));
        await sendresetpasswordmail(userdate.userName,userdate.email,userdate.id,code);
        res.status(200).send({
          success: true,
          message: "Email sent successfully",
        });
       
    } catch{
      res.status(200).send({
        success: false,
        message: "Error in forgot password",
      });
    }
  }




  module.exports={loginController, registerController,sendresetpasswordmail ,forgotPasswordController };



