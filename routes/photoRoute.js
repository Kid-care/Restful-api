const express = require('express');
const router = express.Router();
const {uploadPhoto , getUserPhotos} = require('../Controllers/photoController');
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

router.post('/upload', upload.single('photo'), uploadPhoto);

router.get('/photos', getUserPhotos);

module.exports = router;
