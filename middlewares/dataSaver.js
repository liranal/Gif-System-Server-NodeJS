const getMethodMiddleWare = require("./getMiddleware");
const postMethodMiddleWare = require("./postMiddleware");
const patchMethodMiddleWare = require("./patchMiddleware");
const deleteMethodMiddleWare = require("./deleteMiddleware");

module.exports = {
  getMethodMiddleWare,
  postMethodMiddleWare,
  patchMethodMiddleWare,
  deleteMethodMiddleWare,
};
