import { getSpecificInfo, getAllInfo } from "../utils/GET";
import { postInfo } from "../utils/POST";
import { patchById } from "../utils/PATCH";
import { deleteById } from "../utils/DELETE";

var express = require("express");
var router = express.Router();

router.get("/:postId", function (req, res, next) {
  const postComments = getSpecificInfo("comment", "post_id", req.params.postId);
  postComments ? res.send(postComments) : res.status(400).send("not found");
});

router.post("/", function (req, res) {
  const currComment = postInfo("comment", req.body);
  currComment ? res.send(currComment) : res.status(400).send("did not succeed");
});

router.delete("/:commentId", function (req, res) {
  const deletedComment = deleteById("comment", req.params.commentId);
  deletedComment
    ? res.send(deletedComment)
    : res.status(400).send("did not succeed");
});

router.patch("/:commentId", function (req, res) {
  const patchedComment = patchById("comment", req.params.commentId, req.body);
  patchedComment
    ? res.send(patchedComment)
    : res.status(400).send("did not succeed");
});

module.exports = router;
