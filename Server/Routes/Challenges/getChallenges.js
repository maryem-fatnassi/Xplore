const express = require("express");
const challengeRouter = express.Router();
const Challenge = require("../../Models/RegisteredUsers/challengesModel");

challengeRouter.get("/challenge", async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = challengeRouter;