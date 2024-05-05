const express = require("express");
const router = express.Router();
require('dotenv').config();
const JWT = require("jsonwebtoken");
const {verifyToken} = require("../middleware/verifyToken");
const { comparePassword, hashPassword } = require("../helpers/authHelper");
const bcrypt = require("bcrypt");
const { User, validateRegisterUser } = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const {diseases , countries , vaccines} = require('../helpers/dataSet');

// search
function search(query , dataset){
    const matchingWords = dataset.filter(word =>
      word.startsWith(query)
    );
    return matchingWords;
  }

const search_diseases = asyncHandler(async (req, res) => {
    const query  = req.body.query;
    const searchResult = search(query , diseases);
    res.status(200).json({searchResult});
})

const search_countries = asyncHandler(async (req, res) => {
    const query  = req.body.query;
    const searchResult = search(query, countries);
    res.status(200).json({searchResult});
})

const search_vaccines = asyncHandler(async (req, res) => {
    const query  = req.body.query;
    const searchResult = search(query, vaccines);
    res.status(200).json({searchResult});
})


// search for user

const userSearch = (req, res) => {
    try{
        const {email , NationalID} = req.body;
        User.findOne({email , NationalID}).then(user => {
            if(!user){
                return res.status(404).json({
                    status: false,
                    message: "المستخدم غير موجود"
                });
            }
            res.status(200).json({
                status: true,
                user
            });
        })
    }catch(error) {
        res.status(500).json({
            status: false,
            message: "حدث خطأ ما"
        });
    }
}

module.exports = {search_diseases, search_countries, search_vaccines , userSearch};




