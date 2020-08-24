const events = require("./EVENTS");
const Response = require("./Responses");
const NEW_CLIENT = require("./EVENTS").NEW_CLIENT;
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const dataSaver = require("./middlewares/dataSaver");
var UsersSubjects = require("./middlewares/dataSaver").UsersSubjects;
var HistoryData = require("./middlewares/dataSaver").HistoryData;
var gifAPI = require("./models/gifAPI");
var cors = require("cors");

const port = process.env.PORT || 8321;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

app.get("/api/UsersSubjects/:userId", dataSaver.getMethodMiddleWare);
app.post("/api/UsersSubjects", dataSaver.postMethodMiddleWare);
app.patch(
  "/api/UsersSubjects/:userId/Subject/:subject",
  dataSaver.patchMethodMiddleWare
);
app.delete(
  "/api/UsersSubjects/:userId/Subject/:subject",
  dataSaver.deleteMethodMiddleWare
);

app.use("/api/UsersSubjects", require("./routes/subjectsRoute"));
const server = http.createServer(app);
const io1 = socketIo.listen(server);
server.listen(port);

var counter = 0;
setInterval(function () {
  sendGIF();
  counter++;
}, 1000);

//app.set("UsersSubjects", UsersSubjects);

var activeSockets = new Map();
io1.on("connection", function (socket1) {
  socket1.on(NEW_CLIENT, function (data) {
    console.log("@@@ NEW CLIENT @@@");
    console.log(data);
    if (activeSockets.has(data.userId)) {
      io1
        .to(activeSockets.get(data.userId))
        .emit(events.CONNECTION_ERROR_ALREADY_CONNECTED);
    }
    activeSockets.set(data.userId, socket1.id);
    if (!HistoryData.has(data.userId)) {
      HistoryData.set(data.userId, []);
    } else {
      var loadHistory = HistoryData.get(data.userId);
    }
    if (!UsersSubjects.has(data.userId)) UsersSubjects.set(data.userId, []);
    io1.emit(
      events.CONNECTION_SUCCESS,
      JSON.stringify(Response.CONNECTION_SUCCESS(data.userId, loadHistory))
    );
  });

  socket1.on("disconnect", function () {
    console.log("### Disconnect ### ");
    activeSockets.forEach((value, userId) => {
      if (value === socket1.client.id) {
        console.log("USERID: " + userId);
        activeSockets.delete(userId);
      }
    });
  });

  /*socket1.on(events.NEW_SUBJECT, function (data) {
    console.log("!!! NEW SUBJECT !!!");
    console.log(data);
    userSubject = JSON.parse(data);
    UsersSubjects.get(userSubject.userId).push({
      subject: userSubject.subject,
      timing: userSubject.timing,
      startTime: userSubject.startTime,
    });
  });

  */
});

const sendGIF = () => {
  UsersSubjects.forEach((subjects, userId) => {
    subjects.forEach(async (subject) => {
      let timeDiff = parseInt(
        (new Date().getTime() % subject.startTime) / 1000
      );
      if (timeDiff % subject.timing === 0 && activeSockets.has(userId)) {
        const gif = await gifAPI.GetRandomGif(subject.subject);
        let message = JSON.stringify({
          subject: subject.subject,
          gifUrl: gif.data.images.fixed_height_small.url,
          width: gif.data.images.fixed_height_small.width,
          height: gif.data.images.fixed_height_small.height,
          id: gif.data.title
        });
        HistoryData.get(userId).push(JSON.parse(message));

        console.log("Sending message: " + JSON.stringify(message));
        console.log("Sending To: " + userId);

        io1.to(activeSockets.get(userId)).emit(events.NEW_GIF, message);
      }
    });
  });
};

console.log("Server Listening At Port %s...", port);
