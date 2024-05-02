const express = require('express');
const router = express.Router()
const {search_diseases, search_countries, search_vaccines} = require('../Controllers/searchController');


router.get('/search_diseases', search_diseases);

router.get('/search_countries', search_countries);

router.get('/search_vaccines', search_vaccines);

module.exports = router;