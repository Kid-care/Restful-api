const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String
    },
    advice: {
        type: String,
        required: false,
        },
    category: {
      type: mongoose.ObjectId,
      ref: "category",
      required: true,
     
    }
    ,
    user: {
      type: mongoose.ObjectId,
      ref: "user",
      required: true,
     
    }
    ,
    doctor:{
        type: String,
        required: false,
    }
  } 
  ,
  { timestamps: true }
);

module.exports = mongoose.model("AdminCategory", ItemSchema);