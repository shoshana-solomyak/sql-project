import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const toLogin = useNavigate();
  const location = useLocation();
  const currUser = Number(location.pathname.split("/")[1]);

  useEffect(() => {
    if (localStorage.getItem("currentUser") !== currUser) {
      toLogin("/");
    }
  });

  function logOut() {
    localStorage.setItem("currentUser", "undefined");
    toLogin("/");
  }

  return (
    <>
      <button className="logout" type="button" onClick={logOut}>
        Log out
      </button>
      <nav>
        <button type="button">hi</button>
      </nav>
    </>
  );
};

export default Nav;
