const socketIo = require("socket.io");
const { NEW_CLIENT, NEW_GIF } = require("../GlobalObjects/EVENTS");
const newClient = require("./newClient");
const disconnectClient = require("./disconnectClient");

var sendGIF = require("./SendGif");

module.exports = (server) => {
  var counter = 0;
  setInterval(function () {
    console.log(counter);
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
