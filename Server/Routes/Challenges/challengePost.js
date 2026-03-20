const Challenge = require("../../Models/RegisteredUsers/challengesModel");
const express = require("express");
const challengeRouter = express.Router();

challengeRouter.post("/challenge", async (req, res) => {
  try {
    const { title, image, location, usersJoined, difficulty ,type,equipment,duration,desc,rules} = req.body;
    const newChallenge = new Challenge({
      title,
      image,
      location,
      usersJoined,
      difficulty,
      type,
      equipment,
      duration,
      desc,
      rules
    });
    await newChallenge.save();
    res.status(201).json({ message: "Challenge created successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = challengeRouter;