var gifAPI = require("../models/gifAPI");
const { NEW_GIF } = require("../GlobalObjects/EVENTS");
var UsersSubjects = require("../GlobalObjects/UsersSubjects");
var HistoryData = require("../GlobalObjects/HistoryData");
var activeSockets = require("../GlobalObjects/ActiveSockets");

module.exports = (io1) => {
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
