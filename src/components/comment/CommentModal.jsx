import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { createComment } from "../../lib/api/post";
import CloseIcon from "../../lib/assets/icons/CloseIcon";
import { useGetComments } from "../../lib/hooks/commentHooks";
import { useGetUserById } from "../../lib/hooks/userHooks";
import styled from "./CommentModal.module.css";
import Heart from "../../lib/assets/icons/Heart";
import FilledHeart from "../../lib/assets/icons/FilledHeart";
import { updateCommentData } from "../../lib/api/post";
import SingleComment from "./SingleComment";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "70%",
    maxHeight: "70%",
    height: "70%",
    transform: "translate(-50%, -50%)",
    overflowY: "hidden",
  },
};

const CommentModal = ({ currentUser, post, setIsOpen, modalIsOpen }) => {
  const [content, setContent] = useState("");
  const { comments } = useGetComments(post.id);

  const { userData } = useGetUserById(currentUser);

  const handleCreateComment = (e) => {
    e.preventDefault();

    createComment(userData.id, content, post.id, post.comments);
    setContent("");
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className={styled.header}>
        <p>Comments</p>
        <div onClick={closeModal}>
          <CloseIcon width="24px" height="24px" />
        </div>
      </div>
      <div className={styled.modal}>
        <div className={styled.commentForm}>
          <img
            src={userData.profilePic}
            alt="profile"
            width={30}
            height={30}
            style={{ objectFit: "cover", overflowClipMargin: "unset" }}
          />
          <input
            type="text"
            placeholder="Write comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleCreateComment}>Comment</button>
        </div>
        <div className={styled.commentList}>
          {comments.length ? (
            comments.map((comment) => (
              <SingleComment comment={comment} currentUser={currentUser} />
            ))
          ) : (
            <p
              className={styled.commentContent}
              style={{ textAlign: "center", padding: 0 }}
            >
              Be the first to comment
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
