const {  createByAdmin , getItemsByCategory, updateItem, deleteItem,count_documents
} = require('../Controllers/AdminCategory');

const express = require('express');
const router = express.Router()


router.post('/create_Item', createByAdmin);
router.get('/getItemsByCategory', getItemsByCategory);
router.put('/updateItem', updateItem);
router.delete('/deleteItem', deleteItem);
router.get('/count_documents', count_documents);


module.exports = router;