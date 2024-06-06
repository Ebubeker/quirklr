import React, { useState } from "react";
import styled from "./CommentModal.module.css";
import { createComment } from "../../lib/api/post";
import { useGetComments } from "../../lib/hooks/commentHooks";
import { Link } from "react-router-dom";
import { useGetUserById } from "../../lib/hooks/userHooks";

const CommentModal = ({ currentUser, post }) => {
  const [content, setContent] = useState("");
  const { comments } = useGetComments(post.id);

  const { userData } = useGetUserById(currentUser);

  const handleCreateComment = (e) => {
    e.preventDefault();

    createComment(userData.id, content, post.id, post.comments);
    setContent("");
  };

  return (
    <div className={styled.modal}>
      <div className={styled.commentForm}>
        <img src={userData.profilePic} alt="profile" width={30} height={30} style={{objectFit: "cover", overflowClipMargin: "unset"}}/>
        <input
          type="text"
          placeholder="Write comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleCreateComment}>Comment</button>
      </div>
      {/* <hr /> */}
      <div className={styled.commentList}>
        {comments.length ? comments.map((comment) => (
          <div className={styled.comment}>
            <div className={styled.commentHeader}>
              <img
                src={comment.user.profilePic}
                width={20}
                alt={comment.user.name}
              />
              <Link
                to={`user/${comment.user.id}`}
                style={{ textDecoration: "none", color: "#000000" }}
              >
                <p>{comment.user.name}</p>
              </Link>
            </div>
            <p className={styled.commentContent}>{comment.content}</p>
          </div>
        )) : <p className={styled.commentContent} style={{textAlign: "center", padding: 0}}>Be the first to comment</p>}
      </div>
    </div>
  );
};

export default CommentModal;
