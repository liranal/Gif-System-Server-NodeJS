const mongoose = require("mongoose");
var schema = mongoose.Schema;

var UserSubjectSchema = new schema({
  userId: String,
  subject: String,
  timing: String,
  startTime: String,
});

module.exports = mongoose.model("UserSubject", UserSubjectSchema);
