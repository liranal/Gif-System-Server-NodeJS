const activeSockets = require("../GlobalObjects/ActiveSockets");
const HistoryData = require("../GlobalObjects/HistoryData");
const Gif = require("../models/Gif");

module.exports = (socket1) => () => {
  console.log("### Disconnect ### ");
  activeSockets.forEach((value, userId) => {
    if (value === socket1.client.id) {
      console.log("USERID: " + userId);
      activeSockets.delete(userId);
      SaveGifsInDB(userId);
    }
  });
};

const SaveGifsInDB = (userId) => {
  HistoryData.get(userId).forEach((gif) => {
    let newGif = new Gif({
      userId: userId,
      subject: gif.subject,
      gifUrl: gif.gifUrl,
      width: gif.width,
      height: gif.height,
      id: gif.title,
    });
    newGif.save();
  });
};
