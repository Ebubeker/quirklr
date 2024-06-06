import React, { useContext } from "react";
import { useGetPosts } from "../../lib/hooks/postHooks";
import { Context } from "../../context/AuthContext";
import Post from "./Post";
import styles from "./feedStyles.module.css"

const Posts = () => {
  const { userData } = useContext(Context);
  const { posts } = useGetPosts(userData ? userData.id : undefined);

  if (!posts) return <p>loading...</p>;

  return (
    <div className={styles.gridCard}>
      {posts.map((post) => (
        <Post postData={post} currentUser={userData.id}/>
      ))}
    </div>
  );
};

export default Posts;
