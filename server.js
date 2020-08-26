require("./config/database");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
var cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
app.use("/api/UsersSubjects/", require("./routes/subjectsRoute"));

const server = http.createServer(app);
const port = process.env.PORT || 8321;
const io1 = require("./socket/socketConfig");
io1(server);
server.listen(port);
console.log("Server Listening At Port %s...", port);
