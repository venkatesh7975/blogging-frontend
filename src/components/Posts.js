import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://blogging-backend-hy6p.onrender.com/api/posts`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      <h2>All Posts</h2>
      {token && (
        <div className="create-post-link">
          <Link to="/my-posts" className="btn">
            Create New Post
          </Link>
        </div>
      )}
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post._id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <Comments postId={post._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
