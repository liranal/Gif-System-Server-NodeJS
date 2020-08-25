const responses = require("../Responses");
const UserSubject = require("../models/UserSubject");
const Gif = require("../models/Gif");

var UsersSubjects = new Map();
var HistoryData = new Map();

exports.getMethodMiddleWare = function (req, res, next) {
  userId = req.params.userId;
  if (!UsersSubjects.has(userId)) {
    loadUserSubjectsFromDB(userId);
    loadHistoryDataFromDB(userId);
    console.log(UsersSubjects);
  }
  if (!HistoryData.has(userId)) {
    req.Code = responses.NOT_FOUND;
  } else {
    req.middleData = responses.SEND_DATA({
      HistoryData: HistoryData.get(userId),
      UserObjects: UsersSubjects.get(userId),
    });
  }
  next();
};
exports.postMethodMiddleWare = function (req, res, next) {
  userSubject = req.body;
  if (!UsersSubjects.has(userSubject.userId)) {
    //UsersSubjects.set(userSubject.userId, []);
    loadUserSubjectsFromDB(userSubject.userId);
    console.log(UsersSubjects);
  }
  let isObjectHasBeenIndexed = findObjectInUsersBySubjectName(
    userSubject.subject,
    userSubject.userId
  );
  if (isObjectHasBeenIndexed === -1) {
    UsersSubjects.get(userSubject.userId).push({
      subject: userSubject.subject,
      timing: userSubject.timing,
      startTime: userSubject.startTime,
    });
  }
  req.userSubject = userSubject;
  next();
};
exports.patchMethodMiddleWare = function (req, res, next) {
  userSubject = {
    subject: req.params.subject,
    ...req.body,
  };

  console.log("PATCH");
  console.log(userSubject);
  let indexToUpdate = findObjectInUsersBySubjectName(
    userSubject.subject,
    req.params.userId
  );
  if (indexToUpdate > -1) {
    UsersSubjects.get(req.params.userId)[indexToUpdate] = userSubject;
  }
  req.userSubject = userSubject;
  next();
};

exports.deleteMethodMiddleWare = function (req, res, next) {
  userSubject = { userId: req.params.userId, subject: req.params.subject };
  let indexToDelete = findObjectInUsersBySubjectName(
    userSubject.subject,
    userSubject.userId
  );
  if (indexToDelete > -1) {
    let del = UsersSubjects.get(userSubject.userId).splice(indexToDelete, 1);
    console.log(
      HistoryData.get(userSubject.userId).filter(
        (subject) => subject.subject !== userSubject.subject
      )
    );
    HistoryData.set(
      userSubject.userId,
      HistoryData.get(userSubject.userId).filter(
        (subject) => subject.subject !== userSubject.subject
      )
    );
  }
  req.userSubject = userSubject;
  next();
};

const findObjectInUsersBySubjectName = (subjectName, userId) => {
  let userSubjects = UsersSubjects.get(userId);
  if (userSubjects) {
    return userSubjects.findIndex((subject) => {
      return subject.subject == subjectName;
    });
  }
  return -1;
};

const loadUserSubjectsFromDB = (userId) => {
  UserSubject.find({ userId: userId }, function (err, userSubjects) {
    if (!err) UsersSubjects.set(userId, [...userSubjects]);
  });
};

loadHistoryDataFromDB = (userId) => {
  Gif.find({ userId: userId }, function (err, userHistory) {
    if (!err) HistoryData.set(userId, [...userHistory]);
  });
};
exports.HistoryData = HistoryData;
exports.UsersSubjects = UsersSubjects;
