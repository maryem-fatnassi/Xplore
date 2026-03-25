const User = require("../../Models/signUp");

const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const upload = require("../../Middleware/uploadUserAvatar");

// GET all users
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const role = req.query.role;
  const sortBy = req.query.sortBy || "createdAt";
  const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

  const skip = (page - 1) * limit;

  // 🔥 filter
  let filter = {};
  if (role === "admins") filter.is_admin = true;
  if (role === "users") filter.is_admin = false;

  const users = await User.find(filter)
    .select("-password")
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(filter);

  res.json({
    users,
    total
  });
});

router.get("/roles_count", async (req, res) => {
  try {
    const adminsCount = await User.countDocuments({ is_admin: true });
    const usersCount = await User.countDocuments({ is_admin: false });

    res.json({
      admins: adminsCount,
      users: usersCount
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single user
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.json(user);
});

// CREATE user
router.post("/", (req, res) => {
  upload.single("avatar")(req, res, async (err) => {
    if (err) {
      console.error("UPLOAD ERROR 👉", err);

      return res.status(500).json({
        message: err.message,
        stack: err.stack
      });
    }

    try {
      let userData = {
        ...req.body,
        avatar: req.file ? req.file.path : null
      };

      if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        userData.password = hashedPassword;
      }

      const newUser = new User(userData);
      const savedUser = await newUser.save();

      res.json(savedUser);
    } catch (err) {
      console.error("APP ERROR 👉", err);

      res.status(500).json({
        message: err.message,
        stack: err.stack
      });
    }
  });
});

// UPDATE user
router.put("/:id", upload.single("avatar"), async (req, res) => {
  try {
    const updateData = {
      ...req.body
    };

    if (req.file) {
      updateData.avatar = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;