const responses = require("../Responses");

var UsersSubjects = new Map();
var HistoryData = new Map();

exports.getMethodMiddleWare = function (req, res, next) {
  userId = req.params.userId;
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
  if (!UsersSubjects.has(userSubject.userId))
    UsersSubjects.set(userSubject.userId, []);

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
  let indexToUpdate = findObjectInUsersBySubjectName(
    userSubject.subject,
    req.params.userId
  );
  UsersSubjects.get(req.params.userId)[indexToUpdate] = userSubject;
  req.userSubject = userSubject;
  next();
};
exports.deleteMethodMiddleWare = function (req, res, next) {
  userSubject = { userId: req.params.userId, subject: req.params.subject };
  console.log("Delete: " + JSON.stringify(userSubject));
  let indexToDelete = findObjectInUsersBySubjectName(
    userSubject.subject,
    userSubject.userId
  );
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
  req.userSubject = userSubject;
  next();
};

const findObjectInUsersBySubjectName = (subjectName, userId) => {
  return UsersSubjects.get(userId).findIndex((subject) => {
    return subject.subject == subjectName;
  });
};

exports.HistoryData = HistoryData;
exports.UsersSubjects = UsersSubjects;
