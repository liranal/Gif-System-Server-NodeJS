const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
/*Local DB*/
//mongoose.connect("mongodb://localhost:27017/gifSystemDB");

/*Cloud DB*/
mongoose.connect(MONGO_URI);

const db = mongoose.connection;

db.once("open", () => console.log("Database opened..."));
db.on("error", () => console.log("Error occured.."));
