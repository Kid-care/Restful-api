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
   
    category: {
      type: mongoose.ObjectId,
      ref: "category",
      required: true,
     
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);