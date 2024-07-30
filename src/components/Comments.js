import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Comments.css";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");
  const currentUser = token ? jwtDecode(token) : null;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://blogging-backend-hy6p.onrender.com/api/comments/${postId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCreateComment = async () => {
    try {
      const response = await axios.post(
        `https://blogging-backend-hy6p.onrender.com/api/comments`,
        { post_id: postId, content: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleUpdateComment = async (id, updatedContent) => {
    if (!updatedContent) return;
    try {
      const response = await axios.put(
        `https://blogging-backend-hy6p.onrender.com/api/comments/${id}`,
        { content: updatedContent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(
        comments.map((comment) =>
          comment._id === id ? response.data : comment
        )
      );
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(
        `https://blogging-backend-hy6p.onrender.com/api/comments/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(comments.filter((comment) => comment._id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <p>
            <strong>{comment.author_id.username}:</strong> {comment.content}
          </p>
          {currentUser && currentUser.id === comment.author_id._id && (
            <>
              <button
                className="btn-update"
                onClick={() =>
                  handleUpdateComment(
                    comment._id,
                    prompt("Update comment:", comment.content)
                  )
                }
              >
                Update
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDeleteComment(comment._id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      {token && (
        <button className="btn-add" onClick={handleCreateComment}>
          Add Comment
        </button>
      )}
    </div>
  );
};

export default Comments;
