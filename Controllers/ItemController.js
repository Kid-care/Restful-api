const ItemModel = require("../models/ItemModel");
const categoryModel = require("../models/categoryModel");

const fs = require("fs");
const slugify = require("slugify");

const createItem = async (req, res) => {
    try {
      const { name } = req.body;
      const { category } = req.headers;
      // Check if the item already exists in this category
      const itemExists = await ItemModel.findOne({ name, category });
      if (itemExists) {
        return res.status(400).json({ message: "Item already exists" });
      }
      // Create a new item
      const item = new ItemModel({
        name,
        slug: slugify(name),
        category,
      });
      await item.save();
      res.status(200).json({ message: "Item created successfully" });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }     
};
  
  const getItemController = async (req, res) => {
    try {
      
      const { category } = req.headers;
      const items = await ItemModel
        .find({ category })
        .populate("category");
      res.status(200).send(items);

    }
    catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

    exports.createItem = createItem;
    exports.getItemController = getItemController;