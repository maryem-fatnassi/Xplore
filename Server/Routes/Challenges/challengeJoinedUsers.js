const express = require("express");
const challengeRouter = express.Router();
const Challenge = require("../../Models/RegisteredUsers/challengesModel"); 

challengeRouter.post("/join", async (req, res) => {
  try {
    const { challengeId, userId } = req.body;

    // 1. البحث عن التحدي في قاعدة البيانات
    const challenge = await Challenge.findById(challengeId);
    
    if (!challenge) {
      return res.status(404).json({ message: "Mission not found in database" });
    }

    // 2. التحقق ما إذا كان المستخدم قد انضم مسبقاً (منع التكرار)
    if (challenge.joinedUsers && challenge.joinedUsers.includes(userId)) {
      return res.status(400).json({ message: "You have already deployed to this mission!" });
    }

    // 3. تحديث البيانات (إضافة الـ ID وزيادة العداد)
    challenge.joinedUsers.push(userId);
    challenge.usersJoined = (challenge.usersJoined || 0) + 1;

    await challenge.save();

    // 4. الرد بـ JSON (مهم جداً لتجنب خطأ الـ Unexpected Token)
    res.status(200).json({ 
      message: "Deployment Successful",
      newCount: challenge.usersJoined,
      status: "success"
    });

  } catch (error) {
    console.error("Join Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = challengeRouter;