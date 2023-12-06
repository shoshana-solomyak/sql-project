import { getSpecificInfo, getAllInfo } from "../utils/GET";
import { postInfo } from "../utils/POST";
import { patchById } from "../utils/PATCH";
import { deleteById } from "../utils/DELETE";

var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const allPosts = getAllInfo("post");
  allPosts ? res.send(allPosts) : res.status(400).send("not found");
});

router.get("/:userId", function (req, res, next) {
  const userPosts = getSpecificInfo("post", "user_id", req.params.userId);
  userPosts ? res.send(userPosts) : res.status(400).send("not found");
});

router.post("/", function (req, res) {
  const currPost = postInfo("post", req.body);
  currPost ? res.send(currPost) : res.status(400).send("did not succeed");
});

router.delete("/:postId", function (req, res) {
  const deletedPost = deleteById("post", req.params.postId);
  deletedPost ? res.send(deletedPost) : res.status(400).send("did not succeed");
});

router.patch("/:postId", function (req, res) {
  const patchedPost = patchById("post", req.params.postId, req.body);
  patchedPost ? res.send(patchedPost) : res.status(400).send("did not succeed");
});

module.exports = router;
