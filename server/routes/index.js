const { getSpecificInfo } = require("../utils/GET");
var express = require("express");
var router = express.Router();

router.post("/", async function (req, res, next) {
  console.log("req.body: ", req.body);
  const currUser = await getSpecificInfo("user", "username", req.body.username);
  console.log("currUser: ", currUser);
  if (currUser.length > 0) {
    console.log(" currUser[0].id: ", currUser[0].id);
    const currPassword = await getSpecificInfo(
      "user_password",
      "user_id",
      currUser[0].id
    );
    console.log("currPassword : ", currPassword);
    currPassword[0].password === req.body.password
      ? res.send(currUser[0])
      : res.status(500).send("wrong password");
  } else {
    res.status(400).send("not found");
  }
});

module.exports = router;
