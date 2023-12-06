import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let userId = currentUser.id;
const Nav = () => {
  return (
    <>
      <button className="logout" type="button" onClick={logOut}>
        Log out
      </button>
      <nav>
        <Link to={`/${userId}/todos`}>
          <button type="button">todos</button>
        </Link>
      </nav>
    </>
  );
};

export default Nav;
