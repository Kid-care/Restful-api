const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

   // create category
 const createCategory = async (req, res) =>{
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: " الاسم مطلوب " });
        const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "الفئة موجودة بالفعل",
      });
    }
        
        const category = new categoryModel({ name, slug: slugify(name)}).save();
        res.status(200).json({
            message: "تم إنشاء الفئة بنجاح",
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "خطأ أثناء إنشاء الفئة"
        })
    }

};
// update category
const updateCategory = async (req, res) => {
    try{
        const { name } = req.body;
        const {id} = req.params;
        if (!name) return res.status(400).json({ message: "الاسم مطلوب" });
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
          );
          res.status(200).send({
            success: true,
            messsage: "تم تحديث الفئة بنجاح",
            category,
          });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "خطأ أثناء تحديث الفئة"
        })
    }
};
    // delete category
    const deleteCategoryCOntroller = async (req, res) => {
        try {
          const { id } = req.params;
          await categoryModel.findByIdAndDelete(id);
          res.status(200).send({
            success: true,
            message: "تم حذف الفئة بنجاح",
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: "خطأ أثناء حذف الفئة",
            error,
          });
        }
      };
      // get all categories
      const categoryControlller = async (req, res) => {
        try {
          const category = await categoryModel.find({});
          res.status(200).send({
            success: true,
            message: "قائمة كافة الفئات",
            category,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            error,
            message: " خطأ أثناء الحصول  على جميع الفئات",
          });
        }
      };
      // single category
 const singleCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "الحصول على فئة واحدة بنجاح",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "خطأ أثناء الحصول على فئة واحدة",
      });
    }
  };
    

exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategoryCOntroller;
exports.categoryControlller = categoryControlller;
exports.singleCategoryController =singleCategoryController;