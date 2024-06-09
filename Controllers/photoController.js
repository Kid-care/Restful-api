const { User } = require('../models/userModel');
const cloudinary = require('cloudinary').v2;

const { getUserFromToken } = require('../helpers/getuserfromToken');
const { getAdminFromToken } = require('../helpers/getuserfromToken');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const uploadPhoto = async (req, res) => {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).send({
        status: false,
        message: "توكن مفقود",
      });
    }

    const user = await getUserFromToken(token);

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "المستخدم غير مسجل",
      });
    }

    const email = user.email;

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

    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).send({
        status: false,
        message: "توكن مفقود",
      });
    }

    const user = await getUserFromToken(token);

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "المستخدم غير مسجل",
      });
    }

    const email = user.email;

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


const admingetUserPhotos = async (req, res) => {
  try {

    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).send({
        status: false,
        message: "توكن مفقود",
      });
    }

    const admin = await getAdminFromToken(token);

    if (!admin) {
      return res.status(404).send({
        status: false,
        message: "المستخدم غير مسجل",
      });
    }

    const id = req.headers['id'];

    const user = await User.findById(id);

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

module.exports = { uploadPhoto, getUserPhotos , admingetUserPhotos};
