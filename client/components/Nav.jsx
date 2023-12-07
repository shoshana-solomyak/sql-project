import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Nav = () => {
  const [showUser, setShowUser] = useState(false);
  let userId, userName, userUsername, userEmail;
  if (localStorage.getItem("currentUser") != "undefined") {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    userId = currentUser.id;
    userName = currentUser.name;
    userUsername = currentUser.username;
    userEmail = currentUser.email;
  } else {
    userId = -1;
  }
  const toLogin = useNavigate();

  function logOut() {
    localStorage.setItem("currentUser", "undefined");
    toLogin("/");
  }

  return (
    <>
      <nav className="mainNav">
        <div className="userHeader">
          <h2 className="userHello">Hello, {userName}</h2>
          <button
            type="button"
            className="userInfoBtn"
            onClick={() => {
              setShowUser((prev) => !prev);
            }}
          >
            i
          </button>
          {showUser && (
            <div>
              <h4>Username: {userUsername}</h4>
              <h4>Email: {userEmail}</h4>
            </div>
          )}
        </div>
        <button className="mainNavBtns logout" type="button" onClick={logOut}>
          Log out
        </button>
        <Link to={`/${userId}`}>
          <button className="mainNavBtns" type="button">
            home feed
          </button>
        </Link>
        <Link to={`/${userId}/posts`}>
          <button className="mainNavBtns" type="button">
            user posts
          </button>
        </Link>
        <Link to={`/${userId}/todos`}>
          <button className="mainNavBtns" type="button">
            todos
          </button>
        </Link>
      </nav>
    </>
  );
};

export default Nav;
