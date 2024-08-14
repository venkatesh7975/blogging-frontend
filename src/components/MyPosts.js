import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyPosts.css";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/author/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching my posts:", error);
      }
    };

    fetchMyPosts();
  }, [token]);

  const handleCreatePost = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPosts([...posts, response.data]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleUpdatePost = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${currentPostId}`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPosts(
        posts.map((post) => (post._id === currentPostId ? response.data : post))
      );
      setTitle("");
      setContent("");
      setCurrentPostId(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const startUpdate = (post) => {
    setCurrentPostId(post._id);
    setTitle(post.title);
    setContent(post.content);
  };

  return (
    <div className="my-posts-container">
      <h2>Create a Post</h2>
      <div className="create-post">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {currentPostId ? (
          <button onClick={handleUpdatePost}>Update Post</button>
        ) : (
          <button onClick={handleCreatePost}>Create Post</button>
        )}
      </div>
      <h2>My Posts</h2>
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post._id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => startUpdate(post)}>Edit</button>
            <button onClick={() => handleDeletePost(post._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
