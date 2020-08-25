const Gif = require("../../models/Gif");
const HistoryData = require("../../GlobalObjects/HistoryData");

module.exports = (userId) => {
  Gif.find({ userId: userId }, function (err, userHistory) {
    if (!err) HistoryData.set(userId, [...userHistory]);
  });
};
