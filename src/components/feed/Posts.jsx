import React, { useContext, useEffect, useRef, useCallback } from "react";
import { useGetPosts } from "../../lib/hooks/postHooks";
import { Context } from "../../context/AuthContext";
import Post from "./Post";
import styles from "./feedStyles.module.css";
import { useGetPostsByFollowingList } from "../../lib/hooks/postHooks";
import { useDeviceType } from "../../lib/hooks/device-type";
import Followers from "./Followers";

const Posts = () => {
  const { userData } = useContext(Context);
  const { posts, loading, refetch } = useGetPostsByFollowingList(
    userData ? userData.id : undefined
  );
  const isMobile = useDeviceType()

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if we've reached the bottom
      if (scrollTop + windowHeight >= documentHeight) {
        console.log("Reached the bottom of the page");
        refetch();
      }
    });
  }, []);

  if (!posts && loading) return <p>loading...</p>;

  console.log(Boolean(posts && posts.length));

  return Boolean(posts && posts.length) ? (
    posts.map((post) => (
      <div className={styles.gridCard}>
        <Post postData={post} currentUser={userData.id} />
      </div>
    ))
  ) : (
    <div className={styles.noPosts}>
      <p>Follow a user to activate the feed.</p>
      {isMobile ? (
        <Followers />
      ) : null}
    </div>
  );
};

export default Posts;
