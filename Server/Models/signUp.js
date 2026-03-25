const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  is_admin: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male"
  },
  description: {
    type: String
  },
  avatar: {
    type: String
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports=User;