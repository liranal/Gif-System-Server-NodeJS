const findObjectInUsersBySubjectName = require("./utils/findObjectInUsersBySubjectName");
const UsersSubjects = require("../GlobalObjects/UsersSubjects");

module.exports = (req, res, next) => {
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
