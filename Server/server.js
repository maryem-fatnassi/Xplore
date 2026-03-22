require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB = require("./Config/db");
connectDB();

// ** Authentication **
app.use("/api/users", require("./Routes/auth/signUp"));
app.use("/api/users", require("./Routes/auth/login"));

// ** Rare Places **
app.use("/rarePlaces", require("./Routes/RarePlaces/places"));
app.use("/fetchPlaces",require("./Routes/RarePlaces/getPlaces"));

// ** Challenges ** 
app.use("/challenges",require("./Routes/Challenges/challengePost"));
app.use("/getChallenges",require("./Routes/Challenges/getChallenges"))
app.use("/api/challenges", require("./Routes/Challenges/challengeJoinedUsers"));

//** Posts **/
app.use("/api/posts",require("./Routes/Posts/createPost"));
app.use("/api/posts",require("./Routes/Posts/getPosts"));
app.use("/api/posts",require("./Routes/Posts/likes"));
app.use("/api/posts",require("./Routes/Posts/comments"))

app.listen(process.env.PORT, () => console.log("Server is running"));
