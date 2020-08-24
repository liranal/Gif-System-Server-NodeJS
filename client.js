const events = require("./EVENTS");
// Client
var io2 = require("socket.io-client");
var socket2 = io2.connect("http://localhost:8321");

var id = "linoy";
var userIdObj = { userId: id };
socket2.emit("NEW_CLIENT", userIdObj);

socket2.on(events.CONNECTION_SUCCESS, function (data) {
  console.log(data);
  var firstObj = {
    userId: id,
    subject: "dog",
    timing: 5,
    startTime: new Date().getTime(),
  };

  socket2.emit(events.NEW_SUBJECT, JSON.stringify(firstObj));
});

socket2.on(events.NEW_GIF, function (data) {
  console.log("Recieved:" + JSON.stringify(data));
});
