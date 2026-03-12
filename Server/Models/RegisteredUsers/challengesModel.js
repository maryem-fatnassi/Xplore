const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    difficulty: { 
        type: String 
    },
    usersJoined: { 
        type: Number 
    },
    type: {
      type: String,
      enum: ["global", "location"],
    },
    location: {
      lat: Number,
      lng: Number,
    },
    equipment : String,
    duration : String,
  },
  { timestamps: true },
);

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
