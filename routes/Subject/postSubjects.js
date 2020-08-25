const UserSubject = require("../../models/UserSubject");

module.exports = async (req, resp) => {
  let NewUserSubject = new UserSubject({
    userId: req.userSubject.userId,
    subject: req.userSubject.subject,
    timing: req.userSubject.timing,
    startTime: req.userSubject.startTime,
  });
  let isInDB = await UserSubject.find({
    userId: req.userSubject.userId,
    subject: req.userSubject.subject,
  });
  if (isInDB.length === 0) {
    NewUserSubject.save(function (err) {
      if (err) {
        return resp.send(err);
      } else {
        return resp.json(req.userSubject);
      }
    });
  } else {
    return resp.json(responses.ALREADY_EXIST_SUBJECT);
  }
};
