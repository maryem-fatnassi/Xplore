const express = require("express");
const postRouter = express.Router();
const Post = require("../../Models/RegisteredUsers/posts");
const upload = require("../../Middleware/uploadUserAvatar");

postRouter.post("/create", upload.single("media"), async (req, res) => {
  try {
    const { userId, description, location } = req.body;

    // فحص إضافي: إذا لم يصل ملف وكان الهدف رفع ميديا
    const mediaUrl = req.file ? req.file.path : null;
    
    // تصحيح mimetype: أحياناً يكون undefined إذا فشل الرفع
    let mediaType = "text";
    if (req.file) {
        mediaType = req.file.mimetype.startsWith('video') ? 'video' : 'image';
    }

    const newPost = new Post({
      user: userId, // تأكد أن userId ليس null
      description,
      location: location || "Unknown Location",
      media: mediaUrl,
      mediaType: mediaType
    });

    await newPost.save();
    
    // ملاحظة مهمة: تأكد أن الموديل Post يحتوي على حقل باسم user ومربوط بـ User
    const populatedPost = await Post.findById(newPost._id).populate("user", "userName");
    
    res.status(201).json(populatedPost);
  } catch (error) {
    console.error("SERVER CRASH ERROR:", error);
    res.status(500).json({ error: error.message }); // نرسل رسالة الخطأ الحقيقية
  }
});
module.exports=postRouter;