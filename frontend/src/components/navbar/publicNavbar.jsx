import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { logoutUserAction } from "../../redux/slices/users/userSlices";
import "../styles/navbar.css";
const PublicNavbar = () => {
  

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
          <h1>Public</h1>
          <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            Home
          </Link>
        </li>
        <li className="nav-items"></li>
        <li className="nav-items">
          <Link to="/requests" className="nav-links" onClick={closeMobileMenu}>
            Categories
          </Link>
        </li>

        <li className="nav-items">
          <Link to="/login" className="nav-links" onClick={handleLogout}>
            Login
          </Link>
        </li>

        <li className="nav-items">
          <Link to="/register" className="nav-links" onClick={handleLogout}>
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default PublicNavbar;
