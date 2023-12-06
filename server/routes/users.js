import { getSpecificInfo } from "../utils/GET";

var express = require("express");
var router = express.Router();

router.get("/:userId", function (req, res, next) {
  const currUser = getSpecificInfo("user", "id", req.params.userId);
  currUser ? res.send(currUser) : res.status(400).send("not found");
});

module.exports = router;
