import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateCommentData } from "../../lib/api/post";
import FilledHeart from "../../lib/assets/icons/FilledHeart";
import Heart from "../../lib/assets/icons/Heart";
import styled from "./CommentModal.module.css";

const SingleComment = ({ currentUser, comment }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeToggle = (comment, value) => {
    let newLikeList = comment.likes;
    if (value) {
      newLikeList = [...newLikeList, currentUser];
      setLiked(true);
    } else {
      newLikeList = newLikeList.filter(function (liker) {
        return liker !== currentUser;
      });
      setLiked(false);
    }
    updateCommentData(comment.id, { likes: newLikeList });
  };

  useEffect(() => {
    if (comment) {
      if (comment.likes.includes(currentUser)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [comment]);

  return (
    <div>
      <div className={styled.comment}>
        <div>
          <div className={styled.commentHeader}>
            <img
              src={comment.user.profilePic}
              width={20}
              height={20}
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
        <div className={styled.like}>
          <p>{comment.likes.length ? comment.likes.length : null}</p>
          {/* <Heart /> */}
          {liked ? (
            <FilledHeart
              width="18px"
              onClick={() => handleLikeToggle(comment, false)}
            />
          ) : (
            <Heart
              width="18px"
              onClick={() => handleLikeToggle(comment, true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
