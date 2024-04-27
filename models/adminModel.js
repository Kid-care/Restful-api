const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Joi = require("joi");
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    city:{
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    }, roles: {
      type: String,
      default: 'admin',
      required: true,
    }
  }, 
  { timestamps: true } 
);


function validateRegisterAdmin(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(3).max(255).required(),
    phoneNumber: Joi.string().min(11).max(11).required(),
    city: Joi.string().min(3).max(255).required(),
    specialization: Joi.string().min(2).max(255).required(),
    roles: Joi.string().optional().default('admin')
  });
  return schema.validate(user);
}


function validateLoginAdmin(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(user);
}

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Admin, validateRegisterAdmin , validateLoginAdmin};
