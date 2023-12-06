import { useEffect, useState } from "react";
import Post from "./Post";

const Home = () => {
  const [currPage, setCurrPage] = useState(1);
  const [postsToShow, setPostsToShow] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        let currPosts = await fetch(
          `http://localhost:3000/posts/pages/${currPage || 1}`
        );
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
  }, [currPage]);

  return (
    <main>
      {postsToShow &&
        postsToShow.map((post, index) => {
          if (post.is_active) {
            return (
              <Post
                key={index}
                title={post.title}
                body={post.body}
                userId={post.user_id}
              />
            );
          }
        })}
      <button
        type="button"
        onClick={() => {
          setCurrPage((prev) => (prev === 1 ? 1 : prev - 1));
        }}
      >
        previous page
      </button>
      <button
        type="button"
        onClick={() => {
          setCurrPage((prev) => (prev === 10 ? 10 : prev + 1));
        }}
      >
        next page
      </button>
    </main>
  );
};

export default Home;
