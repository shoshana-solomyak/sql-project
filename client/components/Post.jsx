import { useEffect, useState } from "react";

const Post = ({ title, body, userId }) => {
  const [currUsername, setCurrUsername] = useState("");

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
    <div>
      <h2>{title}</h2>
      <h3>{currUsername}</h3>
      <p>{body}</p>
    </div>
  );
};

export default Post;
