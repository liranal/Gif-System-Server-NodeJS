const UsersSubjects = require("../GlobalObjects/UsersSubjects");
const loadUserSubjectsFromDB = require("./utils/loadUserSubjectsFromDB");
const findObjectInUsersBySubjectName = require("./utils/findObjectInUsersBySubjectName");

module.exports = (req, res, next) => {
  userSubject = req.body;
  if (!UsersSubjects.has(userSubject.userId)) {
    loadUserSubjectsFromDB(userSubject.userId);
    console.log(UsersSubjects);
  }
  let isObjectHasBeenIndexed = findObjectInUsersBySubjectName(
    userSubject.subject,
    userSubject.userId
  );
  console.log(isObjectHasBeenIndexed);
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
