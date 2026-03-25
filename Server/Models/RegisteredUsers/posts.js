const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", // تأكد أن اسم موديل المستخدم عندك هو User
    required: true 
  },
  location: { type: String, default: "Unknown Location" },
  description: { type: String, required: true },
  media: { type: String }, // رابط الصورة أو الفيديو
  mediaType: { type: String, enum: ["image", "video", "text"], default: "text" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // مصفوفة تحتوي على الـ IDs للذين أعجبوا بالمنشور
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: String, // لتسهيل العرض
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  status: {
    type: String,
    enum: ["pending", "published", "rejected"],
    default: "pending"
  }
}, { timestamps: true }); // سيعطينا حقل createdAt و updatedAt تلقائياً

module.exports = mongoose.model("Post", postSchema);