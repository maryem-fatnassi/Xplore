const express = require("express");
const postRouter = express.Router();
const Post = require("../../Models/RegisteredUsers/posts");

// إضافة تعليق جديد لمنشور معين
postRouter.post("/comment/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, userName, text } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // إنشاء كائن التعليق الجديد
    const newComment = {
      user: userId,
      userName: userName, // نخزنه هنا لسهولة العرض في الـ Frontend
      text: text,
      createdAt: new Date()
    };

    post.comments.push(newComment);
    await post.save();

    // نرسل التعليقات المحدثة للـ React
    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
});

module.exports=postRouter;