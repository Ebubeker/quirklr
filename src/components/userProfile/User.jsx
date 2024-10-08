import React, { useContext } from "react";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./userStyles.module.css";
import {
  useCheckIfIFollow,
  useGetFollowingList,
} from "../../lib/hooks/userHooks";
import { Context } from "../../context/AuthContext";
import { follow, unfollow } from "../../lib/api/user";
import FinishOnBoarding from "../banners/FinishOnBoarding";
import { useGetUserPostsTotalLikes } from "../../lib/hooks/postHooks";

export const User = ({ children, userData, profile = false }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { userData: currentUser } = useContext(Context);

  const { aFollower } = useCheckIfIFollow(
    currentUser ? currentUser.id : "",
    userData.id
  );

  const { followingList, followersList } = useGetFollowingList(userData.id);
  const { totalLikesCount } =  useGetUserPostsTotalLikes(userData.id);

  async function handleSignOut() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const handleFollow = (e) => {
    e.preventDefault();
    follow(currentUser.id, userData.id);
  };

  const handleUnfollow = (e) => {
    e.preventDefault();
    unfollow(currentUser.id, userData.id);
  };

  return (
    <div className={styles.container}>
      <FinishOnBoarding />
      <div className={styles.userContent}>
        <div className={styles.profileHeader}>
          <img
            src={userData.profilePic}
            alt=""
            width={150}
            height={150}
            className={styles.profilePic}
          />
          <div className={styles.contentInfo}>
            <div className={styles.userData}>
              <p className={styles.username}>@{userData.username}</p>
              <p className={styles.name}>{userData.name}</p>
              <p className={styles.bio}>{userData.bio}</p>
            </div>
            <div className={styles.accountAnalytics}>
              <div className={styles.statistic}>
                <p className={styles.number}>{followingList?.length ?? 0}</p>
                <p>Following</p>
              </div>
              <div className={styles.statistic}>
                <p className={styles.number}>{followersList?.length ?? 0}</p>
                <p>Followers</p>
              </div>
              <div className={styles.statistic}>
                <p className={styles.number}>{totalLikesCount}</p>
                <p>Likes</p>
              </div>
            </div>
          </div>
        </div>
        {!profile && !(userData.id === (currentUser ? currentUser.id : '')) ? (
          <button
            className={aFollower ? styles.unfollowButton : styles.followButton}
            onClick={(e) => (aFollower ? handleUnfollow(e) : handleFollow(e))}
          >
            {aFollower ? "Unfollow" : "Follow"}
          </button>
        ) : null}
      </div>
      {children}
      <div className={styles.userContent}>
        <p className={styles.cardTitle}>Dangerous area</p>
        <div className={styles.logout} onClick={() => handleSignOut()}>
          Log Out
        </div>
      </div>
    </div>
  );
};
