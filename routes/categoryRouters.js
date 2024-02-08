const { createCategory,
    updateCategory,
    deleteCategory,
    categoryControlller,
    singleCategoryController
  } = require('../Controllers/categoryController.js')
  const {adminAccess } = require('../middleware/authmiddleware')

const express = require('express');
const router = express.Router();

router.post('/create', adminAccess, createCategory);
router.put('/update/:id', adminAccess, updateCategory);
router.delete('/delete/:id', adminAccess, deleteCategory);
router.get('/all', categoryControlller);
router.get('/:slug', singleCategoryController);

module.exports = router;