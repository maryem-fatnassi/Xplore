const express = require("express");
const postRouter = express.Router();
const Post = require("../../Models/RegisteredUsers/posts");

// 1. جلب كل المنشورات (مع بيانات صاحب المنشور)
postRouter.get("/all", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "userName email") // جلب اسم المستخدم فقط للحماية
      .sort({ createdAt: -1 }); // الأحدث أولاً
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

module.exports=postRouter;

