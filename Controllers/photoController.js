const { User } = require('../models/userModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const uploadPhoto = async (req, res) => {
  try {
    const { email } = req.headers;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    let folder;
    if (!user.cloudinaryFolder) {
      folder = `users/${email}`;
      user.cloudinaryFolder = folder;
      await user.save();
    } else {
      folder = user.cloudinaryFolder;
    }

    const result = await cloudinary.uploader.upload(req.file.path, { folder });

    return res.status(200).json({ message: 'تم تحميل الصورة بنجاح', url: result.url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'خطأ داخلي في الخادم' });
  }
};


const getUserPhotos = async (req, res) => {
  try {
    const { email } = req.headers;
    const user = await User.findOne({ email });

    console.log(email);

    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    if (!user.cloudinaryFolder) {
      return res.status(404).json({ message: 'لم يتم العثور على مجلد' });
    }

    const photos = await cloudinary.search
      .expression(`folder:${user.cloudinaryFolder}`) 
      .execute();

    return res.status(200).json({ photos: photos.resources });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'خطأ داخلي في الخادم' });
  }
};

module.exports = { uploadPhoto, getUserPhotos };
