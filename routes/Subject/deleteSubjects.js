const Gif = require("../../models/Gif");
const UserSubject = require("../../models/UserSubject");

module.exports = (req, resp) => {
  Gif.deleteMany(
    {
      userId: req.userSubject.userId,
      subject: req.userSubject.subject,
    },
    (data) => {
      console.log(data);
    }
  );
  UserSubject.deleteOne(
    { userId: req.userSubject.userId, subject: req.userSubject.subject },
    function (err) {
      if (err) {
        return resp.send(err);
      } else {
        return resp.json(req.userSubject);
      }
    }
  );
};
