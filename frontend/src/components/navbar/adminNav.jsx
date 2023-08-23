import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { logoutUserAction } from "../../redux/slices/users/userSlices";
import "../styles/navbar.css";

const AdminNavbar = () => {
  const userAuth = useSelector((state) => state.users.userAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    dispatch(logoutUserAction());
    closeMobileMenu();
    navigate("/");
  };

  return (
    <div className="navbar mb-12">
      <Link to="/">
        {" "}
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"} />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-items">
          <h1>Admin</h1>
          <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            Home
          </Link>
        </li>
        <li className="nav-items">
          {userAuth && (
            <Link
              to="/new-request"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Create Post
            </Link>
          )}
        </li>
        <li className="nav-items">
          <Link to="/requests" className="nav-links" onClick={closeMobileMenu}>
            Categories
          </Link>
        </li>

        <li className="nav-items">
          {userAuth && (
            <button className="nav-links" onClick={handleLogout}>
              Log Out
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
