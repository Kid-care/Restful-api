const { createCategory,
    updateCategory,
    deleteCategory,
    categoryControlller,
    singleCategoryController
  } = require('../Controllers/categoryController.js')
  const {isAdmin } = require('../middleware/isAdmin.js')
  const {isOwner} = require('../middleware/isOwner.js')


const express = require('express');
const router = express.Router();

router.post('/create' , createCategory); 
router.put('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);
router.get('/all', categoryControlller);
router.get('/:slug', singleCategoryController);

module.exports = router;