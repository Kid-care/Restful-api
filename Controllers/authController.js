const express = require("express");
const router  = express.Router() ;
require('dotenv').config();
const jwt = require("jsonwebtoken");
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

exports.registerController = registerController;