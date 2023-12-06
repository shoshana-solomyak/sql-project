const { getSpecificInfo } = require("../utils/GET");
const { postInfo } = require("../utils/POST");
const { patchById } = require("../utils/PATCH");
const { deleteById } = require("../utils/DELETE");
var express = require("express");
var router = express.Router();

router.get("/:userId", async function (req, res, next) {
  const userTodos = await getSpecificInfo("todo", "user_id", req.params.userId);
  userTodos ? res.send(userTodos) : res.status(400).send("not found");
});

router.post("/", async function (req, res) {
  console.log("body: ", req.body);
  const currTodo = await postInfo("todo", req.body);
  currTodo ? res.send(currTodo) : res.status(400).send("did not succeed");
});

router.delete("/:todoId", async function (req, res) {
  const deletedTodo = await deleteById("todo", req.params.todoId);
  deletedTodo ? res.send(deletedTodo) : res.status(400).send("did not succeed");
});

router.patch("/:todoId", async function (req, res) {
  const patchedTodo = await patchById("todo", req.params.todoId, req.body);
  patchedTodo ? res.send(patchedTodo) : res.status(400).send("did not succeed");
});

module.exports = router;
