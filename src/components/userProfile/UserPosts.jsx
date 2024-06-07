import React from "react";
import { useGetPostsByUserId } from "../../lib/hooks/postHooks";
import Post from "../feed/Post";
import styles from "./userStyles.module.css"

const UserPosts = ({userId}) => {
  const { posts } = useGetPostsByUserId(userId);

  return (
    <div className={styles.gridCard}>
      {posts.length ? posts.map((post) => (
        <Post postData={post} currentUser={userId}/>
      )) : (
        <p className={styles.noPosts}>No posts yet</p>
      )}
    </div>
  );
};

export default UserPosts;
