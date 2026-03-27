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
    type: {
      type: String,
      enum: ["global", "location"],
    },
    location: {
      lat: Number,
      lng: Number,
    },
    equipment : Array,
    duration : String,
    desc : String,
    rules : Array,
    usersJoined: { type: Number, default: 0 }, // للعداد السريع
  
  // هنا نقوم بربط المستخدمين بالتحدي
  joinedUsers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // يجب أن يطابق الاسم الذي وضعته في mongoose.model("User", ...)
  }],
  date: Date
  },
  { timestamps: true },
);

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
