import React, { useContext, useEffect, useRef, useCallback } from "react";
import { useGetPosts } from "../../lib/hooks/postHooks";
import { Context } from "../../context/AuthContext";
import Post from "./Post";
import styles from "./feedStyles.module.css";

const Posts = () => {
  const { userData } = useContext(Context);
  const { posts, loading, refetch } = useGetPosts(userData ? userData.id : undefined);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
    
      // Check if we've reached the bottom
      if (scrollTop + windowHeight >= documentHeight) {
        console.log('Reached the bottom of the page');
        refetch()
      }
    });
  }, [])
  
  if (!posts && loading) return <p>loading...</p>;

  // Infinite scroll: observe the last grid card (last post)
  // const lastPostElementRef = useCallback(
  //   (node) => {
  //     if (loading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         fetchPosts(); // Fetch more posts when the last post is visible
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [loading, hasMore, fetchPosts]
  // );

  return posts.map((post) => (
    <div
      className={styles.gridCard}
    >
      <Post postData={post} currentUser={userData.id} />
    </div>
  ));
};

export default Posts;
