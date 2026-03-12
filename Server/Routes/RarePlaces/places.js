const Place = require("../../Models/rarePlaces");
const express = require("express");
const placeRouter = express.Router();

placeRouter.post("/place", async (req, res) =>{
    try {
        const { name, image, location, desc } = req.body;
        const newPlace = new Place({
         name,
         image,
         location,
         desc
        });
       await newPlace.save();
       res.status(201).json({ message: "Place created successfully" });
    } catch (error) {
        console.log(error);
    }
})

module.exports=placeRouter;