import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Post from "./Post";

const UserPosts = () => {
  const [postsToShow, setPostsToShow] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  let location = useLocation();
  const currUser = location.pathname.split("/")[1];

  async function addPost() {
    try {
      const newPost = await fetch(`http://localhost:3000/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currUser,
          title: postTitle,
          body: postBody,
          is_active: 1,
        }),
      });
      if (!newPost.ok) throw new Error("error accoured");
      setDataChanged((prev) => !prev);
      setShowNew((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function getPosts() {
      try {
        let currPosts = await fetch(`http://localhost:3000/posts/${currUser}`);
        if (!currPosts.ok) throw new Error("error accoured");
        currPosts = await currPosts.json();
        return currPosts;
      } catch (err) {
        console.log(err);
        return null;
      }
    }

    getPosts().then((value) => {
      setPostsToShow(value);
    });
  }, [currUser, dataChanged]);

  return (
    <main>
      <h1>User Posts</h1>
      <button
        className="newPostBtn"
        type="button"
        onClick={() => setShowNew((prev) => !prev)}
      >
        Add new post
      </button>
      {showNew && (
        <form className="makeNewForm">
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
          <button type="button" onClick={addPost}>
            submit
          </button>
        </form>
      )}
      {postsToShow &&
        postsToShow.map((post, index) => {
          if (post.is_active) {
            return (
              <Post
                key={index}
                id={post.id}
                title={post.title}
                body={post.body}
                userId={post.user_id}
                dataChanged={setDataChanged}
              />
            );
          }
        })}
    </main>
  );
};

export default UserPosts;
