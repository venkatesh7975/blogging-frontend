import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleCreatePost = () => {
    if (!token) {
      alert("You need to be logged in to create a post.");
    } else {
      navigate("/my-posts");
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Blogging Website
      </Link>
      <div className="create-post-link">
        <button onClick={handleCreatePost} className="btn">
          Create New Post
        </button>
      </div>
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
