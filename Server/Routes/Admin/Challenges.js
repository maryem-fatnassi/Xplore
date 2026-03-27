const express = require("express");
const router = express.Router();

const Challenge = require("../../Models/RegisteredUsers/challengesModel");

const upload = require("../../Middleware/uploadChallengeImage");

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
        date: ch.date,

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

// GET single challenge
router.get("/:id", async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  res.json(challenge);
});

// CREATE challenge
router.post("/", (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        stack: err.stack
      });
    }

    try {
      let challengeData = {
        ...req.body,
        image: req.file ? req.file.path : null,
        location: req.body.location ? JSON.parse(req.body.location) : null,
        equipment: req.body.equipment ? JSON.parse(req.body.equipment) : [],
        rules: req.body.rules ? JSON.parse(req.body.rules) : []
      };

      const newChallenge = new Challenge(challengeData);
      const savedChallenge = await newChallenge.save();

      res.json(savedChallenge);
    } catch (err) {
      res.status(500).json({
        message: err.message,
        stack: err.stack
      });
    }
  });
});

// UPDATE challenge
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      location: req.body.location ? JSON.parse(req.body.location) : null,
      equipment: req.body.equipment ? JSON.parse(req.body.equipment) : [],
      rules: req.body.rules ? JSON.parse(req.body.rules) : []
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedChallenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedChallenge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;