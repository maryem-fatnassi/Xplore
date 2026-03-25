const express = require("express");
const router = express.Router();

const Challenge = require("../../Models/RegisteredUsers/challengesModel");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const difficulty = req.query.difficulty || "easy";
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    const filter = { difficulty };

    const challenges = await Challenge.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Challenge.countDocuments(filter);

    const easy = await Challenge.countDocuments({ difficulty: "easy" });
    const medium = await Challenge.countDocuments({ difficulty: "medium" });
    const hard = await Challenge.countDocuments({ difficulty: "hard" });
    const extreme = await Challenge.countDocuments({ difficulty: "extreme" });

    const formattedChallenges = challenges.map(ch => ({
        _id: ch._id,
        title: ch.title,
        image: ch.image,
        difficulty: ch.difficulty,
        type: ch.type,
        duration: ch.duration,
        desc: ch.desc,
        createdAt: ch.createdAt,
        updatedAt: ch.updatedAt,

        countUsers: ch.joinedUsers.length,
        countEquipment: ch.equipment?.length || 0,
        countRules: ch.rules?.length || 0
    }));

    res.json({
      challenges: formattedChallenges,
      total,
      count: {
        easy,
        medium,
        hard,
        extreme
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching challenges" });
  }
});

router.delete("/:id", async (req, res) => {
  await Challenge.findByIdAndDelete(req.params.id);
  res.json({ message: "Challenge deleted" });
});


module.exports = router;