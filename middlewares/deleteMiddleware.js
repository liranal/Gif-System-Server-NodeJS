const findObjectInUsersBySubjectName = require("./utils/findObjectInUsersBySubjectName");
const UsersSubjects = require("../GlobalObjects/UsersSubjects");
const HistoryData = require("../GlobalObjects/HistoryData");

module.exports = (req, res, next) => {
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
    if (HistoryData.has(userSubject.userId)) {
      HistoryData.set(
        userSubject.userId,
        HistoryData.get(userSubject.userId).filter(
          (subject) => subject.subject !== userSubject.subject
        )
      );
    }
  }
  req.userSubject = userSubject;
  next();
};
