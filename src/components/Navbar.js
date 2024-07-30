import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Blogging Website
      </Link>
      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/my-posts" className="nav-link">
              My Posts
            </Link>
            <button onClick={handleLogout} className="nav-link">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
