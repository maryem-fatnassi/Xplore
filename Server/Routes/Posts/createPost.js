const express = require("express");
const postRouter = express.Router();
const Post = require("../../Models/RegisteredUsers/posts");

postRouter.post("/create", async (req, res) => {
  try {
    const { userId, description, location, media, mediaType } = req.body;
    const newPost = new Post({
      user: userId,
      description,
      location,
      media,
      mediaType
    });
    await newPost.save();
    // نقوم بعمل populate لبيانات المستخدم قبل إرجاع المنشور للـ Frontend
    const populatedPost = await Post.findById(newPost._id).populate("user", "userName");
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

module.exports=postRouter;