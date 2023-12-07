import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./Nav";

const Layout = () => {
  let userId;
  if (localStorage.getItem("currentUser") != "undefined") {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    userId = currentUser.id;
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

  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Layout;
