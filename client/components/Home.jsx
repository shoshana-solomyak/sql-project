import { useEffect, useState } from "react";
import Post from "./Post";

const Home = () => {
  const [currPage, setCurrPage] = useState(1);
  const [postsToShow, setPostsToShow] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedTitle, setSearchedTitle] = useState("");
  const [searchedUser, setSearchedUser] = useState("");

  function handleTitleFilter() {
    setSearchQuery(`?title=${searchedTitle}`);
  }

  function handleUserFilter() {
    setSearchQuery(`?user_id=${searchedUser}`);
  }

  useEffect(() => {
    async function getPosts() {
      try {
        let currPosts = await fetch(
          `http://localhost:3000/posts/pages/${currPage || 1}${searchQuery}`
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
  }, [currPage, dataChanged, searchQuery]);

  return (
    <main>
      <div>
        <h2>Filter</h2>
        <input
          type="text"
          value={searchedTitle}
          onChange={(e) => {
            setSearchedTitle(e.target.value);
          }}
        />
        <button type="button" onClick={handleTitleFilter}>
          filter by title
        </button>
        <input
          type="text"
          value={searchedUser}
          onChange={(e) => {
            setSearchedUser(e.target.value);
          }}
        />
        <button type="button" onClick={handleUserFilter}>
          filter by user id
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchQuery("");
          }}
        >
          clear filter
        </button>
      </div>
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
