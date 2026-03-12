const mongoose = require("mongoose");

const connectDB = ()=>{
    mongoose.connect(process.env.DB_URI)
    .then(()=> console.log("MongoDB is connected"))
    .catch((err)=>console.log(err))
}

module.exports = connectDB;