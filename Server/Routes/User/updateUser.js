// Routes/auth/updateUser.js
const express = require("express");
const userRouter = express.Router();
const User = require("../../Models/signUp");

userRouter.put("/update/:id", async (req, res) => {
  try {
    const { userName, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { userName, email },
      { new: true } // ليعيد لك البيانات الجديدة بعد التعديل
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

module.exports=userRouter;