const UserSubject = require("../../models/UserSubject");

module.exports = (req, resp) => {
  let updatedUserSubject = {
    userId: req.userSubject.userId,
    subject: req.userSubject.subject,
    timing: req.userSubject.timing,
    startTime: req.userSubject.startTime,
  };

  UserSubject.updateOne(
    { userId: req.userSubject.userId, subject: req.userSubject.subject },
    updatedUserSubject,
    function (err) {
      if (err) {
        return resp.send(err);
      } else {
        resp.json(req.userSubject);
      }
    }
  );
};
