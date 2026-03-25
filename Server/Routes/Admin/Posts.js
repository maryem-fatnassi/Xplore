const express = require("express");
const router = express.Router();

const Post = require("../../Models/RegisteredUsers/posts");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const status = req.query.status || "pending";
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    const filter = { status };

    const posts = await Post.find(filter)
      .populate("user", "userName avatar gender")
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(filter);

    const pending = await Post.countDocuments({ status: "pending" });
    const published = await Post.countDocuments({ status: "published" });
    const rejected = await Post.countDocuments({ status: "rejected" });

    const formattedPosts = posts.map(post => ({
      _id: post._id,
      description: post.description,
      media: post.media,
      mediatype: post.mediaType,
      location: post.location,
      status: post.status,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,

      userName: post.user?.userName,
      avatar: post.user?.avatar,
      gender: post.user?.gender,

      countLikes: post.likes.length,
      countComments: post.comments.length
    }));

    res.json({
      posts: formattedPosts,
      total,
      count: {
        pending,
        published,
        rejected
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});


router.put("/:id/accept", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.status = "published";
    await post.save();

    res.json({ message: "Post accepted", post });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error accepting post" });
  }
});

router.put("/:id/reject", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.status = "rejected";
    await post.save();

    res.json({ message: "Post rejected", post });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error rejecting post" });
  }
});

module.exports = router;