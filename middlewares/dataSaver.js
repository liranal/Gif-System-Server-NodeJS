const getMethodMiddleWare = require("./getMiddleware");
const postMethodMiddleWare = require("./postMiddleware");
const patchMethodMiddleWare = require("./patchMiddleware");
const deleteMethodMiddleWare = require("./deleteMiddleware");

exports.getMethodMiddleWare = getMethodMiddleWare;
exports.postMethodMiddleWare = postMethodMiddleWare;
exports.patchMethodMiddleWare = patchMethodMiddleWare;
exports.deleteMethodMiddleWare = deleteMethodMiddleWare;
