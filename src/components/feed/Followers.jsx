import React, { useContext, useEffect, useState } from "react";
import styles from "./feedStyles.module.css";
import { useGetRandomUsers } from "../../lib/hooks/userHooks";
import { Context } from "../../context/AuthContext";
import { follow, unfollow } from "../../lib/api/user";
import { Link } from "react-router-dom";

const Followers = () => {
  const [followChange, setFollowChange] = useState(false);
  const { userData: currentUser } = useContext(Context);
  const { usersData } = useGetRandomUsers(
    currentUser ? currentUser.id : undefined,
    followChange
  );

  const handleFollow = (e, userId) => {
    e.preventDefault();
    follow(currentUser.id, userId);

    setFollowChange(!followChange);
  };

  const handleUnfollow = (e, userId) => {
    e.preventDefault();
    unfollow(currentUser.id, userId);
    setTimeout(() => {
      setFollowChange(!followChange);
    }, 500);
  };

  useEffect(() => {
    console.log("user followed");
  }, [followChange]);

  return (
    <div className={styles.userSuggestionList}>
      <p className={styles.cardTitle}>Suggested People</p>
      {usersData.map((user) => (
        <div className={styles.follower}>
          <img src={user.profilePic} width={40} height={40} alt="" />
          {/* <p>{user.name}</p> */}
          <Link to={`/user/${user.id}`}>
            <p>{user.name}</p>
          </Link>
          <button
            className={
              user.following ? styles.unfollowButton : styles.followButton
            }
            onClick={(e) =>
              user.following
                ? handleUnfollow(e, user.id)
                : handleFollow(e, user.id)
            }
          >
            {user.following ? "Unfollow" : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Followers;
