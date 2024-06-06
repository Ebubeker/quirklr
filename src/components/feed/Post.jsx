import React, { useState, useEffect } from "react";
import { useGetUserById } from "../../lib/hooks/userHooks";
import Comment from "../../lib/assets/icons/Comment";
import Heart from "../../lib/assets/icons/Heart";
import FilledHeart from "../../lib/assets/icons/FilledHeart";
import { updatePostData } from "../../lib/api/post";
import CommentModal from "../comment/CommentModal";
import { Link } from "react-router-dom";
import styles from "./feedStyles.module.css";

const createPostWithAnchors = (postContent) => {
  const contentWithSpaces = postContent.replace(/\n/g, " ");
  const words = contentWithSpaces.split(" ");
  const processedContent = words.map((word, index) => {
    if (word.startsWith("#")) {
      return (
        <a key={index} href={`/${word.substring(1)}`}>
          {word}
        </a>
      );
    } else {
      return word;
    }
  });

  // Join the processed words back into a string with spaces
  const contentWithAnchors = processedContent.reduce(
    (acc, word) => (acc === "" ? [word] : [...acc, " ", word]),
    ""
  );

  return <p>{contentWithAnchors}</p>;
};

const Post = ({ postData, currentUser }) => {
  const { userData } = useGetUserById(postData.createdBy);
  const [liked, setLiked] = useState(false);
  const [openComments, setOpenComments] = useState(false);

  const handleLikeToggle = (value) => {
    let newLikeList = postData.likes;
    if (value) {
      newLikeList = [...newLikeList, currentUser];
      setLiked(true);
    } else {
      newLikeList = newLikeList.filter(function (liker) {
        return liker !== currentUser;
      });
      setLiked(false);
    }
    updatePostData(postData.id, { likes: newLikeList });
  };

  useEffect(() => {
    if (postData) {
      if (postData.likes.includes(currentUser)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [postData]);

  if (!userData) return "loading...";

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <img src={userData.profilePic} width={40} height={40} alt="icon" />
        <Link to={`/user/${userData.id}`}>
          <p>{userData.name}</p>
        </Link>
      </div>
      {/* <p>{postData.createdAt}</p> */}
      <img src={postData.img} alt="image" className={styles.postMedia} />
      <div className={styles.content}>
        {createPostWithAnchors(postData.content)}
      </div>
      <div className={styles.postInteraction}>
        <div>
          {liked ? (
            <FilledHeart onClick={() => handleLikeToggle(false)} />
          ) : (
            <Heart onClick={() => handleLikeToggle(true)} />
          )}
          <span className={liked ? styles.likesCount : styles.likesCountUnselected}>
          {postData.likes.length}

          </span>
        </div>
        <div>
          <Comment onClick={() => setOpenComments(!openComments)} />
          <span className={styles.commentCount}>
            {postData.comments.length}
          </span>
        </div>
      </div>
          {openComments ? (
            <CommentModal currentUser={currentUser} post={postData} />
          ) : null}
    </div>
  );
};

export default Post;
