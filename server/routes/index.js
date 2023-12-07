const { getSpecificInfo } = require("../utils/GET");
var express = require("express");
var router = express.Router();

router.post("/", async function (req, res, next) {
  const currUser = await getSpecificInfo("user", "username", req.body.username);

  if (currUser.length > 0) {
    const currPassword = await getSpecificInfo(
      "user_password",
      "user_id",
      currUser[0].id
    );

    currPassword[0].password === req.body.password
      ? res.send(currUser[0])
      : res.status(500).send("wrong password");
  } else {
    res.status(400).send("not found");
  }
});

module.exports = router;
