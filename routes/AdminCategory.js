const {  createByAdmin , getItemsByCategory, updateItem, deleteItem
} = require('../Controllers/AdminCategory');

const express = require('express');
const router = express.Router()


router.post('/create_Item', createByAdmin);
router.get('/getItemsByCategory', getItemsByCategory);
router.put('/updateItem', updateItem);
router.delete('/deleteItem', deleteItem);


module.exports = router;