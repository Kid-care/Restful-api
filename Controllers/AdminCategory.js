const mongoose = require("mongoose");
const AdminCategory = require("../models/AdminCategory");
const categoryModel = require("../models/categoryModel");
const user = require("../models/userModel");

const fs = require("fs");
const slugify = require("slugify");

 const createByAdmin = async (req, res) => {
     
    try {
        const { name, advice, doctor } = req.body;
        const category = req.headers.category;
        const user = req.headers.user;
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });

      }
      // name is exit andthe same category and user
      const isExist = await AdminCategory
        .findOne({ name, category, user });
        if (isExist) {
          return res.status(400).send({ error: "Item Already Exist" });
        }
   
      // category from header
        const Item = new AdminCategory({ ...req.body, slug: slugify(name), category, user });
          await Item.save();
        res.status(200).send({
          success: true,
          message: "Item Created Successfully",
          Item,
        });
    } catch (error) {   
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        }
 }
 // get all items by category and user
    const getItemsByCategory = async (req, res) => {
        try {
            const { category, user } = req.headers;
            const items = await AdminCategory
            .find({ category, user })
            .populate("category", "user")
            res.status(200).send(items);
            console.log(items);
        }                 
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
       
    }
    // update item by admin
    const updateItem = async (req, res) => {
        try {
            const { name, advice, doctor } = req.body;
            const category = req.headers.category;
            const user = req.headers.user;
            const item = req.headers.item;
            const updatedItem = await AdminCategory.findByIdAndUpdate(item, { name, advice, doctor });
            res.status(200).send({ message: "Item Updated Successfully", updatedItem });
             
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    // delete item by admin 
   
    const deleteItem = async (req, res) => {
        try {
            const { category, user } = req.headers;
            const item = req.headers.item; 
            
            const deletedItem = await AdminCategory.findByIdAndDelete(item);
            res.status(200).send({ message: "Item Deleted Successfully", deletedItem });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

 
module.exports = {createByAdmin, getItemsByCategory , updateItem , deleteItem};

