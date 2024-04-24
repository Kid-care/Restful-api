const ItemModel = require("../models/ItemModel");
const categoryModel = require("../models/categoryModel");

const fs = require("fs");
const slugify = require("slugify");

 const createItem = async (req, res) => {
    try {
        const { name } =
        req.body;
  
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });

      }
  // if name is already exist
      const isExist = await ItemModel
        .findOne({ name });
      if (isExist) {
        return res.status(500).send({ error: "Item Already Exist" });
      }
      const Item = new ItemModel({ ...req.body, slug: slugify(name) });
        await Item.save();
      res.status(201).send({
        success: true,
        message: "Item Created Successfully",
        Item,
      });
  } catch (error) {
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
   