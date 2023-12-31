import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Comment from "./Comment";

const Post = ({ id, title, body, userId, dataChanged }) => {
  const [currUsername, setCurrUsername] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [currComments, setCurrComments] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [commentTitle, setCommentTitle] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const location = useLocation();
  const currUser = Number(location.pathname.split("/")[1]);

  async function getComments() {
    try {
      let currComments = await fetch(`http://localhost:3000/comments/${id}`);
      if (!currComments.ok) throw new Error("error accoured");
      currComments = await currComments.json();
      return currComments;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  function handleCommentsBtn() {
    getComments().then((value) => {
      setCurrComments(value);
    });
    setShowComments((prev) => !prev);
  }

  function handleEditBttn() {
    setShowEdit((prev) => !prev);
  }

  async function handleDeleteBttn() {
    try {
      const deletedPost = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });
      if (!deletedPost.ok) throw new Error("error accoured");
      dataChanged((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  async function sendPatchedPost() {
    try {
      const patchedPost = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: postTitle, body: postBody }),
      });
      if (!patchedPost.ok) throw new Error("error accoured");
      dataChanged((prev) => !prev);
      setShowEdit(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function addComment() {
    try {
      const newPost = await fetch(`http://localhost:3000/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: id,
          title: commentTitle,
          body: commentBody,
          is_active: 1,
        }),
      });
      if (!newPost.ok) throw new Error("error accoured");
      dataChanged((prev) => !prev);
      setShowNew((prev) => !prev);
      setShowComments(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function getUsername() {
      try {
        let currUser = await fetch(`http://localhost:3000/users/${userId}`);
        if (!currUser.ok) throw new Error("error accoured");
        currUser = await currUser.json();
        return currUser.username;
      } catch (err) {
        console.log(err);
        return null;
      }
    }
    getUsername().then((value) => {
      setCurrUsername(value);
    });
  }, [userId]);

  return (
    <div className="post">
      <h2>{title}</h2>
      <h4>{currUsername}</h4>
      <p>{body}</p>
      {currUser === userId && (
        <button type="button" onClick={handleEditBttn}>
          Edit post
        </button>
      )}
      {currUser === userId && (
        <button type="button" onClick={handleDeleteBttn}>
          Delete post
        </button>
      )}
      <button
        type="button"
        onClick={() => {
          setShowNew((prev) => !prev);
        }}
      >
        Add new comment
      </button>
      {showNew && (
        <form className="makeNewForm">
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
          <button type="button" onClick={addComment}>
            submit
          </button>
        </form>
      )}
      {showEdit && (
        <form className="editForm">
          <label htmlFor="title">title: </label>
          <input
            type="text"
            name="title"
            value={postTitle}
            onChange={(e) => {
              setPostTitle(e.target.value);
            }}
          />
          <label htmlFor="body">body: </label>
          <input
            type="text"
            name="body"
            value={postBody}
            onChange={(e) => {
              setPostBody(e.target.value);
            }}
          />
          <button type="button" onClick={sendPatchedPost}>
            submit
          </button>
        </form>
      )}
      <button type="button" onClick={handleCommentsBtn}>
        Show Comments
      </button>
      {showComments &&
        currComments &&
        currComments.map((comment, index) => {
          if (comment.is_active) {
            return (
              <Comment
                key={index}
                id={comment.id}
                title={comment.title}
                body={comment.body}
                email={comment.email}
                dataChanged={dataChanged}
                userId={userId}
                showComments={setShowComments}
              />
            );
          }
        })}
    </div>
  );
};

export default Post;
