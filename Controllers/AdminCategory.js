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
    // if name is already exist in category
        const isExist = await AdminCategory
          .findOne({ name });
        if (isExist) {
          return res.status(500).send({ error: "Item Already Exist" });
        }
        const Item = new AdminCategory({ ...req.body, slug: slugify(name), category, user });
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
 }
 // get all items by category and user
    const getItemsByCategory = async (req, res) => {
        try {
            const { category, user } = req.headers;
            const items = await AdminCategory
            .find({ category, user })
            .populate("category", "user")
            res.status(200).send(items);

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

