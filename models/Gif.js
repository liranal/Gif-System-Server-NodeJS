const mongoose = require("mongoose");
var schema = mongoose.Schema;

var GifSchema = new schema({
  userId: String,
  subject: String,
  gifUrl: String,
  width: String,
  height: String,
  id: String,
});

module.exports = mongoose.model("Gif", GifSchema);
