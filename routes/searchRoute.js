const express = require('express');
const router = express.Router()
const {search_diseases, search_countries, search_vaccines , userSearch} = require('../Controllers/searchController');


router.post('/search_diseases', search_diseases);

router.post('/search_countries', search_countries);

router.post('/search_vaccines', search_vaccines);

router.post('/userSearch', userSearch);

module.exports = router;