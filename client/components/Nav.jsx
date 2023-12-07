import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Nav = () => {
  let userId, userName;
  if (localStorage.getItem("currentUser") != "undefined") {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    userId = currentUser.id;
    userName = currentUser.name;
  } else {
    userId = -1;
  }
  let location = useLocation();
  const currUserURL = location.pathname.split("/")[1];
  const toLogin = useNavigate();

  useEffect(() => {
    if (userId != currUserURL) {
      toLogin("/");
    }
  }, [currUserURL, toLogin, userId]);

  function logOut() {
    localStorage.setItem("currentUser", "undefined");
    toLogin("/");
  }

  return (
    <>
      <nav className="mainNav">
        <h2>Hello, {userName}</h2>
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
