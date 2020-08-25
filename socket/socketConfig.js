const socketIo = require("socket.io");
const { NEW_CLIENT, NEW_GIF } = require("../GlobalObjects/EVENTS");
const newClient = require("./newClient");
const disconnectClient = require("./disconnectClient");
var gifAPI = require("../models/gifAPI");
var UsersSubjects = require("../GlobalObjects/UsersSubjects");
var HistoryData = require("../GlobalObjects/HistoryData");
var activeSockets = require("../GlobalObjects/ActiveSockets");
var sendGIF = require("./SendGif");

module.exports = (server) => {
  var counter = 0;
  setInterval(function () {
    sendGIF(io1);
    counter++;
  }, 1000);

  const io1 = socketIo.listen(server);
  io1.on("connection", function (socket1) {
    // New Client
    socket1.on(NEW_CLIENT, newClient(socket1));

    // Disconnect
    socket1.on("disconnect", disconnectClient(socket1));
  });
};
/*
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
            id: gif.data.title,
          });
          HistoryData.get(userId).push(JSON.parse(message));

          console.log("Sending message: " + JSON.stringify(message));
          console.log("Sending To: " + userId);

          io1.to(activeSockets.get(userId)).emit(NEW_GIF, message);
        }
      });
    });
  };
};
*/
