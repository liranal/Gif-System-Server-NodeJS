const UserSubject = require("../../models/UserSubject");
const responses = require("../../GlobalObjects/Responses");
module.exports = (req, resp) => {
  UserSubject.find({ userId: req.params.userId }, function (err, userSubjects) {
    if (err) {
      return resp.send(err);
    }
    return resp.json(responses.SEND_DATA({ UserObjects: [...userSubjects] }));
  });
};
