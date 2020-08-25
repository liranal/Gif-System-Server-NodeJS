const loadUserSubjectsFromDB = require("./utils/loadUserSubjectsFromDB");
const loadHistoryDataFromDB = require("./utils/loadHistoryDataFromDB");
const HistoryData = require("../GlobalObjects/HistoryData");
const UsersSubjects = require("../GlobalObjects/UsersSubjects");
const responses = require("../GlobalObjects/Responses");

module.exports = (req, res, next) => {
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
