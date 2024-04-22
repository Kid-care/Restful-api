const { createItem,getItemController
} = require('../Controllers/ItemController');
const {isAdmin } = require('../middleware/isAdmin');

const express = require('express');
const router = express.Router()

//router.post('/create_Item',isAdmin, createItem);
router.post('/create_Item', createItem);
router.get('/get_Item', getItemController);

module.exports = router;