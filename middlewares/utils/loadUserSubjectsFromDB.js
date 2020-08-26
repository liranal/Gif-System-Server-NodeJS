const UserSubject = require("../../models/UserSubject");
const UsersSubjects = require("../../GlobalObjects/UsersSubjects");
module.exports = (userId) => {
  UserSubject.find({ userId: userId }, function (err, userSubjects) {
    console.log("FINDING");
    if (!err) UsersSubjects.set(userId, [...userSubjects]);
  });
};
