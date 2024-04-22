const { createCategory,
    updateCategory,
    deleteCategory,
    categoryControlller,
    singleCategoryController
  } = require('../Controllers/categoryController.js')
  const {isAdmin } = require('../middleware/isAdmin.js')

const express = require('express');
const router = express.Router();

router.post('/create', createCategory);
//router.post('/create',isAdmin , createCategory); => to make this route only accessible to admin
router.put('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);
router.get('/all', categoryControlller);
router.get('/:slug', singleCategoryController);

module.exports = router;