const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Joi = require("joi");

const ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
        type: String,
        default: 'owner',
        required: true,
    }
  }, 
  { timestamps: true } 
);


function validateRegisterOwner(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(3).max(255).required(),
    roles: Joi.string().required().default("owner"),
  });
  return schema.validate(user);
}


function validateLoginOwner(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(user);
}

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = { Owner, validateRegisterOwner , validateLoginOwner};
