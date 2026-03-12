const express = require("express");
const placeRouter = express.Router();
const Place = require("../../Models/rarePlaces");

placeRouter.get("/place", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports=placeRouter;