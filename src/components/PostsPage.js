import React from 'react';
import { Link } from 'react-router-dom';
import './PostsPage.css';

const PostsPage = () => {
  return (
    <div>
      <h1>Posts</h1>
      <Link to="/create-post" className="create-post-button">Create Post</Link>
      {/* Render the posts here */}
    </div>
  );
};

export default PostsPage;
