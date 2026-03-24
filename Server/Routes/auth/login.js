const User = require("../../Models/signUp");
const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ 
      user: {
        id: user._id, 
        userName: user.userName,
        email: user.email
      }
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = userRouter;
