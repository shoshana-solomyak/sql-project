import { Link } from "react-router-dom";
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let userId = currentUser.id;
const Nav = () => {
  return (
    <nav>
      <Link to={`/${userId}/todos`}>
        <button type="button">todos</button>
      </Link>
    </nav>
  );
};

export default Nav;
