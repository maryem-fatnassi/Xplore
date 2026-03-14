const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
  },
  desc: {
    type: String,
  }
}, { timestamps: true });

const Place = mongoose.model("Place", placeSchema);

module.exports=Place;