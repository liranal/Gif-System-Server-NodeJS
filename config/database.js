const mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost:27017/gifSystemDB");

mongoose.connect(
  "mongodb+srv://liranal:liraneilary1@gif-system.wslz3.mongodb.net/gifSystemDB?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.once("open", () => console.log("Database opened..."));
db.on("error", () => console.log("Error occured.."));

/*
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://liranal:liraneilary1@gif-system.wslz3.mongodb.net/gifSystemDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  client.close();
});

client.once("open", () => console.log("Database opened..."));
client.on("error", () => console.log("Error occured.."));*/
