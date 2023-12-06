import { useEffect, useState } from "react";
import Post from "./Post";

const UserPosts = () => {
  const [postsToShow, setPostsToShow] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        let currPosts = await fetch(
          `http://localhost:3000/posts/${}`
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
  }, [currPage, dataChanged]);

  return (
    <main>
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
