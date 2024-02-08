const mongoose = require("mongoose");
const joi = require("joi");
//const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "الرجاء إدخال البريد الإلكتروني الخاص بك"],
      trim: true,
      minlength: 5,
      unique: true,
    },
    userName: {
      type: String,
      required: [true, "الرجاء إدخال اسمك"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "الرجاء إدخال كلمة المرور الخاصة بك"],
      trim: true,
      minlength: 6,
    },
    fatherName : {
        type: String,
        required: [true, "الرجاء إدخال اسم الأب"],
        trim: true,
        minlength: 3,
    }
    ,
    motherName : {
        type: String,
        required: [true, "الرجاء إدخال اسم الأم"],
        trim: true,
        minlength: 3,
    }
    ,
    bloodType: {
        type: String,
        required: [true, "الرجاء إدخال فصيلة الدم للطفل"],
        trim: true
    }
    ,
    phoneNumber :{
        type: Number,
        required: [true, "الرجاء إدخال رقم هاتفك"],
        trim: true,
        minlength: 11,
    }
    ,
    birthDate: {
        type: String,
        required: [true, "الرجاء إدخال تاريخ ميلاد الطفل"],
        trim: true,
    }
    ,
    NationalID : {
        type: String,
        required: [true, "الرجاء إدخال الرقم الوطني للطفل"],
        trim: true,
    
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

//Generate Token
userSchema.methods.generateToken = function(){
  return jwt.sign({id: this._id ,isAdmin: this.isAdmin} , process.env.JWT_SECRET_KEY);
}

function validateRegisterUser(obj) {

  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email().messages({
      'string.base': 'يجب أن يكون البريد الإلكتروني نصًا',
      'string.empty': 'يجب ألا يكون البريد الإلكتروني فارغًا',
      'string.min': 'يجب أن يحتوي البريد الإلكتروني على الأقل 5 أحرف',
      'string.max': 'يجب ألا يتجاوز البريد الإلكتروني 100 حرفًا',
      'any.required': 'يجب إدخال البريد الإلكتروني',
      'string.email': 'يجب أن يكون البريد الإلكتروني صالحًا'
  }),
  userName: joi.string().trim().min(5).max(100).required().messages({
      'string.base': 'يجب أن يكون اسم المستخدم نصًا',
      'string.empty': 'يجب ألا يكون اسم المستخدم فارغًا',
      'string.min': 'يجب أن يحتوي اسم المستخدم على الأقل 5 أحرف',
      'string.max': 'يجب ألا يتجاوز اسم المستخدم 100 حرفًا',
      'any.required': 'يجب إدخال اسم المستخدم'
  }),
  password: joi.string().trim().min(6).required().messages({
      'string.base': 'يجب أن تكون كلمة المرور نصًا',
      'string.empty': 'يجب ألا تكون كلمة المرور فارغة',
      'string.min': 'يجب أن تحتوي كلمة المرور على الأقل 6 أحرف',
      'any.required': 'يجب إدخال كلمة المرور'
  }),
  fatherName: joi.string().trim().min(3).max(100).required().messages({
      'string.base': 'يجب أن يكون اسم الأب نصًا',
      'string.empty': 'يجب ألا يكون اسم الأب فارغًا',
      'string.min': 'يجب أن يحتوي اسم الأب على الأقل 3 أحرف',
      'string.max': 'يجب ألا يتجاوز اسم الأب 100 حرفًا',
      'any.required': 'يجب إدخال اسم الأب'
  }),
  motherName: joi.string().trim().min(3).max(100).required().messages({
      'string.base': 'يجب أن يكون اسم الأم نصًا',
      'string.empty': 'يجب ألا يكون اسم الأم فارغًا',
      'string.min': 'يجب أن يحتوي اسم الأم على الأقل 3 أحرف',
      'string.max': 'يجب ألا يتجاوز اسم الأم 100 حرفًا',
      'any.required': 'يجب إدخال اسم الأم'
  }),
  phoneNumber: joi.string().trim().min(11).required().messages({
      'string.base': 'يجب أن يكون رقم الهاتف نصًا',
      'string.empty': 'يجب ألا يكون رقم الهاتف فارغًا',
      'string.min': 'يجب أن يحتوي رقم الهاتف على الأقل 11 رقمًا',
      'any.required': 'يجب إدخال رقم الهاتف'
  }),
  NationalID: joi.string().length(14).required().messages({
      'string.base': 'يجب أن يكون الرقم الوطني نصًا',
      'string.empty': 'يجب ألا يكون الرقم الوطني فارغًا',
      'string.length': 'يجب أن يحتوي الرقم الوطني على 14 رقمًا',
      'any.required': 'يجب إدخال الرقم الوطني'
  }),
  birthDate: joi.string().max(10).min(8).required().messages({
      'string.base': 'يجب أن تكون تاريخ الميلاد نصًا',
      'string.empty': 'يجب ألا يكون تاريخ الميلاد فارغًا',
      'string.min': 'يجب أن يحتوي تاريخ الميلاد على الأقل 8 أحرف',
      'string.max': 'يجب ألا يتجاوز تاريخ الميلاد 10 أحرفًا',
      'any.required': 'يجب إدخال تاريخ الميلاد'
  }),
  bloodType: joi.string().required().messages({
      'any.required': 'يجب إدخال فصيلة الدم'
  })
   
  });
  return schema.validate(obj);
}

function validateLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email(),
    password: joi.string().trim().min(6).required()
  });
  return schema.validate(obj);
}

// Validate Change Password
function validateChangePassword(obj) {
  const schema = joi.object({
    password: joi.string().trim().min(6).required()
  });
  return schema.validate(obj);
}

// Validate Update User
function validateUpdateUser(obj) {
  const Schema = joi.object({
      email: joi.string().trim().min(5).max(100).email(),
      username: joi.string().trim().min(2).max(200),
      password: joi.string().trim().min(6)
  
  })
  return Schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
  validateChangePassword
};