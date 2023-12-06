const { getSpecificInfo } = require("../utils/GET");
const { postInfo } = require("../utils/POST");
const { patchById } = require("../utils/PATCH");
const { deleteById } = require("../utils/DELETE");
var express = require("express");
var router = express.Router();

router.get("/:postId", async function (req, res, next) {
  const postComments = await getSpecificInfo(
    "comment",
    "post_id",
    req.params.postId
  );
  postComments ? res.send(postComments) : res.status(400).send("not found");
});

router.post("/", async function (req, res) {
  const currComment = await postInfo("comment", req.body);
  currComment ? res.send(currComment) : res.status(400).send("did not succeed");
});

router.delete("/:commentId", async function (req, res) {
  const deletedComment = await deleteById("comment", req.params.commentId);
  deletedComment
    ? res.send(deletedComment)
    : res.status(400).send("did not succeed");
});

router.patch("/:commentId", async function (req, res) {
  const patchedComment = await patchById(
    "comment",
    req.params.commentId,
    req.body
  );
  patchedComment
    ? res.send(patchedComment)
    : res.status(400).send("did not succeed");
});

module.exports = router;
