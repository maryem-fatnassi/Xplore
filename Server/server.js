require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const connectDB = require("./Config/db");
connectDB();
app.use(cors());

// ** Authentication **
app.use("/api/users", require("./Routes/auth/signUp"));
app.use("/api/users", require("./Routes/auth/login"));

// ** Rare Places **
app.use("/rarePlaces", require("./Routes/RarePlaces/places"));
app.use("/fetchPlaces",require("./Routes/RarePlaces/getPlaces"))

app.listen(process.env.PORT, () => console.log("Server is running"));
