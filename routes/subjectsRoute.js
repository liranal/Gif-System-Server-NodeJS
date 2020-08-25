const express = require("express");
const router = express.Router();

const getSubjects = require("./Subject/getSubjects");
const postSubjects = require("./Subject/postSubjects");
const patchSubjects = require("./Subject/patchSubjects");
const deleteSubjects = require("./Subject/deleteSubjects");

const middleWare = require("../middlewares/dataSaver");

router.get("/:userId", [middleWare.getMethodMiddleWare], getSubjects);

router.post("/", [middleWare.postMethodMiddleWare], postSubjects);

router.patch(
  "/:userId/Subject/:subject",
  [middleWare.patchMethodMiddleWare],
  patchSubjects
);

router.delete(
  "/:userId/Subject/:subject",
  [middleWare.deleteMethodMiddleWare],
  deleteSubjects
);

module.exports = router;
