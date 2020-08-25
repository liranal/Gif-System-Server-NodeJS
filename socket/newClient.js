const activeSockets = require("../GlobalObjects/ActiveSockets");
const events = require("../GlobalObjects/EVENTS");
const HistoryData = require("../GlobalObjects/HistoryData");
const responses = require("../GlobalObjects/Responses");
module.exports = (socket1) => (data) => {
  console.log("@@@ NEW CLIENT @@@");
  console.log(data);
  if (activeSockets.has(data.userId)) {
    socket1.emit(events.CONNECTION_ERROR_ALREADY_CONNECTED);
  }
  activeSockets.set(data.userId, socket1.id);
  if (!HistoryData.has(data.userId)) {
  } else {
    var loadHistory = HistoryData.get(data.userId);
  }
  socket1.emit(
    events.CONNECTION_SUCCESS,
    JSON.stringify(responses.CONNECTION_SUCCESS(data.userId, loadHistory))
  );
};
