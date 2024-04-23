const express = require('express');
const router = express.Router();

const { addAdmin , updateAdmin , deleteAdmin , UserCount , AdminCount} = require('../Controllers/ownerController'); 

router.post('/addAdmin', addAdmin); 

router.put('/updateAdmin', updateAdmin);

router.delete('/deleteAdmin', deleteAdmin);

router.get('/userCount', UserCount);

router.get('/adminUser', AdminCount);

module.exports = router;