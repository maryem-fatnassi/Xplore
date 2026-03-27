const express = require("express");
const router = express.Router();

const Place = require("../../Models/RegisteredUsers/rarePlaces");

const upload = require("../../Middleware/uploadRarePlacesImage");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    const rare_places = await Place.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Place.countDocuments();

    const formattedRarePlaces = rare_places.map(rp => ({
        _id: rp._id,
        name: rp.name,
        image: rp.image,
        desc: rp.desc,
        location: rp.location,
        createdAt: rp.createdAt,
        updatedAt: rp.updatedAt
    }));

    res.json({
      places: formattedRarePlaces,
      total
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching rare places" });
  }
});

router.delete("/:id", async (req, res) => {
  await Place.findByIdAndDelete(req.params.id);
  res.json({ message: "Place deleted" });
});

// GET single pplace
router.get("/:id", async (req, res) => {
  const rare_place = await Place.findById(req.params.id);
  res.json(rare_place);
});

// CREATE
router.post("/", (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        stack: err.stack
      });
    }

    try {
      let rarePlaceData = {
        ...req.body,
        image: req.file ? req.file.path : null,
      };

      const newPlace = new Place(rarePlaceData);
      const savedPlace = await newPlace.save();

      res.json(savedPlace);
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
      ...req.body
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedRarePlace = await Place.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedRarePlace);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;