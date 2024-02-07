const { parse } = require('dotenv');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
// admin access
const adminAccess =async (req, res, next) => {
    try{
        const user =  await UserModel.findById(req.user._id);
        if(parseInt(user.role)!== "admin" ){
            return res.status(401).send({message: "Admin Access Denied"});
        }
        else {
            next();
        }
    }
    catch(error){
        console.log(error);
        res.status(401).send(error)
    }
}

module.exports = { adminAccess}