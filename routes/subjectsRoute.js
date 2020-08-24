const express = require("express");
const router = express.Router();

router.route("/:userId").get(function (req, resp) {
  resp.json(req.middleData);
});

router.route("/").post(function (req, resp) {
  resp.json(req.userSubject);
});
router.route("/:userId/Subject/:subject").patch(function (req, resp) {
  resp.json(req.userSubject);
});
router.route("/:userId/Subject/:subject").delete(function (req, resp) {
  resp.json(req.userSubject);
});

module.exports = router;
