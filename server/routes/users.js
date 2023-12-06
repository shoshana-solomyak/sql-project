const { getSpecificInfo } = require("../utils/GET");
var express = require("express");
var router = express.Router();

router.get("/:userId", async (req, res, next) => {
  const currUser = await getSpecificInfo("user", "id", req.params.userId);
  currUser ? res.send(currUser) : res.status(400).send("not found");
});

module.exports = router;
