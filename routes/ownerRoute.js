const express = require('express');
const router = express.Router();

const { addAdmin , updateAdmin , deleteAdmin , getAllAdmins , UserCount , AdminCount , filterUser , registerOwner , loginOwner} = require('../Controllers/ownerController'); 

router.post('/addAdmin', addAdmin); 

router.put('/updateAdmin', updateAdmin);

router.delete('/deleteAdmin', deleteAdmin);

router.get('/getAllAdmins', getAllAdmins);

router.get('/userCount', UserCount);

router.get('/adminCount', AdminCount);

router.get('/filterUser', filterUser);

router.post('/registerOwner', registerOwner);

router.post('/loginOwner', loginOwner);


module.exports = router;