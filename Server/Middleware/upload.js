const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// إعدادات حسابك في Cloudinary (تحصل عليها من موقعهم مجاناً)
cloudinary.config({
  cloud_name: 'ds5gcavv5',
  api_key: '361825647643337',
  api_secret: 'BvMI0lS4N0aggbu3LChWNB1ATqg'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'XPlore_Posts', // اسم المجلد في السحاب
    resource_type: 'auto', // لكي يقبل صور وفيديو معاً
  },
});

const upload = multer({ storage: storage });
module.exports = upload;