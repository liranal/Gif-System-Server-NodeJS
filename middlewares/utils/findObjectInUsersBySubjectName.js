const UsersSubjects = require("../../GlobalObjects/UsersSubjects");

module.exports = (subjectName, userId) => {
  let userSubjects = UsersSubjects.get(userId);
  if (userSubjects) {
    return userSubjects.findIndex((subject) => {
      return subject.subject == subjectName;
    });
  }
  return -1;
};
