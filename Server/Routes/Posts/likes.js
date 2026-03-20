const express = require("express");
const postRouter = express.Router();
const Post = require("../../Models/RegisteredUsers/posts");


// 3. التفاعل مع الإعجاب (Like/Unlike)
postRouter.post("/like/:postId", async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.postId);
    
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id.toString() !== userId); // Unlike
    } else {
      post.likes.push(userId); // Like
    }
    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    res.status(500).json({ message: "Error toggling like" });
  }
});

module.exports = postRouter;