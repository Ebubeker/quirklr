import React from "react";
import Posts from "./Posts";
import styles from './feedStyles.module.css'
import Followers from "./Followers";

const FeedGrid = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.postGrid}>
        <Posts />
      </div>
      <div className={styles.othersGrid}>
        <Followers />
      </div>
    </div>
  );
};

export default FeedGrid;
