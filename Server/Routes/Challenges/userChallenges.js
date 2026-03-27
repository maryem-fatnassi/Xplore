// routes/challengeRoutes.js (أو الملف المسؤول عن التحديات عندك)
const express = require('express');
const router = express.Router();
const Challenge = require('../../Models/RegisteredUsers/challengesModel'); // تأكد من المسار الصحيح

router.get('/:userId', async (req, res) => {
try {
        const { userId } = req.params;
        
        // تحويل النص القادم من الفرونت-أند إلى ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // البحث في مصفوفة joinedUsers
        const challenges = await Challenge.find({ 
            joinedUsers: { $in: [userObjectId] } 
        });

        console.log(`Searching for challenges joined by: ${userId}`);
        console.log(`Found ${challenges.length} challenges.`);

        res.status(200).json(challenges);
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;