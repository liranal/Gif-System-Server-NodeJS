const express = require("express");
const router = express.Router();
const UserSubject = require("../models/UserSubject");
const responses = require("../Responses");
const Gif = require("../models/Gif");
router.route("/:userId").get(function (req, resp) {
  UserSubject.find({ userId: req.params.userId }, function (err, userSubjects) {
    if (err) {
      return resp.send(err);
    }
    return resp.json(responses.SEND_DATA({ UserObjects: [...userSubjects] }));
  });
});

router.route("/").post(async function (req, resp) {
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
});
router.route("/:userId/Subject/:subject").patch(function (req, resp) {
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
});
router.route("/:userId/Subject/:subject").delete(function (req, resp) {
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
});

module.exports = router;
