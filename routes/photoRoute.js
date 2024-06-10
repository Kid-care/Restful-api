const express = require('express');
const router = express.Router();
const {uploadPhoto , getUserPhotos , admingetUserPhotos} = require('../Controllers/photoController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/postPhoto', upload.single('photo'), uploadPhoto);

router.get('/getPhotos', getUserPhotos);

router.get('/getPhotosAdmin', admingetUserPhotos);

module.exports = router;
