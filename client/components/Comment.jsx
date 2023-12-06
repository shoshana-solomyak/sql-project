import { useState } from "react";
import { useLocation } from "react-router-dom";

const Comment = ({
  id,
  title,
  body,
  email,
  dataChanged,
  userId,
  showComments,
}) => {
  const [commentTitle, setCommentTitle] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const location = useLocation();
  const currUser = Number(location.pathname.split("/")[1]);

  function handleEditBttn() {
    setShowEdit((prev) => !prev);
  }

  async function handleDeleteBttn() {
    try {
      const deletedComment = await fetch(
        `http://localhost:3000/comments/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!deletedComment.ok) throw new Error("error accoured");
      dataChanged((prev) => !prev);
      showComments((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  async function sendPatchedComment() {
    try {
      const patchedPost = await fetch(`http://localhost:3000/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: commentTitle, body: commentBody }),
      });
      if (!patchedPost.ok) throw new Error("error accoured");
      dataChanged((prev) => !prev);
      showComments((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h3>{title}</h3>
      <h5>{email}</h5>
      <p>{body}</p>
      {currUser === userId && (
        <button type="button" onClick={handleEditBttn}>
          Edit comment
        </button>
      )}
      {currUser === userId && (
        <button type="button" onClick={handleDeleteBttn}>
          Delete comment
        </button>
      )}
      {showEdit && (
        <form>
          <label htmlFor="title">title: </label>
          <input
            type="text"
            name="title"
            value={commentTitle}
            onChange={(e) => {
              setCommentTitle(e.target.value);
            }}
          />
          <label htmlFor="body">body: </label>
          <input
            type="text"
            name="body"
            value={commentBody}
            onChange={(e) => {
              setCommentBody(e.target.value);
            }}
          />
          <button type="button" onClick={sendPatchedComment}>
            submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Comment;
