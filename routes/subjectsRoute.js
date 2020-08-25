const express = require("express");
const router = express.Router();

const getSubjects = require("./Subject/getSubjects");
const postSubjects = require("./Subject/postSubjects");
const patchSubjects = require("./Subject/patchSubjects");
const deleteSubjects = require("./Subject/deleteSubjects");

const {
  deleteMethodMiddleWare,
  getMethodMiddleWare,
  patchMethodMiddleWare,
  postMethodMiddleWare,
} = require("../middlewares/dataSaver");

router.get("/:userId", [getMethodMiddleWare], getSubjects);

router.post("/", [postMethodMiddleWare], postSubjects);

router.patch(
  "/:userId/Subject/:subject",
  [patchMethodMiddleWare],
  patchSubjects
);

router.delete(
  "/:userId/Subject/:subject",
  [deleteMethodMiddleWare],
  deleteSubjects
);

module.exports = router;
