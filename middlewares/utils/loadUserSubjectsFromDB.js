const UserSubject = require("../../models/UserSubject");
const UsersSubjects = require("../../GlobalObjects/UsersSubjects");
module.exports = (userId) => {
  console.log("LOADING");
  UserSubject.find({ userId: userId }, function (err, userSubjects) {
    console.log("FINDING");
    if (!err) UsersSubjects.set(userId, [...userSubjects]);
  });
};
