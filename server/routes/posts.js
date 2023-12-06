const {
  getSpecificInfo,
  getLimitedInfo,
  getSpecificLimitedInfo,
} = require("../utils/GET");
const { postInfo } = require("../utils/POST");
const { patchById } = require("../utils/PATCH");
const { deleteById } = require("../utils/DELETE");
var express = require("express");
var router = express.Router();

router.get("/pages/:page", async function (req, res, next) {
  let allPosts;
  console.log(Object.keys(req.query));
  if (Object.keys(req.query).length > 0) {
    const [key, value] = Object.entries(req.query)[0];
    console.log(key, value);
    allPosts = await getSpecificLimitedInfo(
      "post",
      key,
      value,
      10,
      (Number(req.params.page) - 1) * 10
    );
  } else {
    allPosts = await getLimitedInfo(
      "post",
      10,
      (Number(req.params.page) - 1) * 10
    );
  }
  allPosts ? res.send(allPosts) : res.status(400).send("not found");
});

router.get("/:userId", async function (req, res, next) {
  const userPosts = await getSpecificInfo("post", "user_id", req.params.userId);
  userPosts ? res.send(userPosts) : res.status(400).send("not found");
});

router.post("/", async function (req, res) {
  const currPost = await postInfo("post", req.body);
  currPost ? res.send(currPost) : res.status(400).send("did not succeed");
});

router.delete("/:postId", async function (req, res) {
  const deletedPost = await deleteById("post", req.params.postId);
  deletedPost ? res.send(deletedPost) : res.status(400).send("did not succeed");
});

router.patch("/:postId", async function (req, res) {
  const patchedPost = await patchById("post", req.params.postId, req.body);
  patchedPost ? res.send(patchedPost) : res.status(400).send("did not succeed");
});

module.exports = router;
