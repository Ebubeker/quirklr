import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useGetUserById, useCheckIfIFollow } from "../../lib/hooks/userHooks";
import { Context } from "../../context/AuthContext";
import { follow, unfollow } from "../../lib/api/user";

const User = () => {
  const { userId } = useParams();
  const { userData: currentUser } = useContext(Context);

  const { userData } = useGetUserById(userId);
  const { aFollower } = useCheckIfIFollow(
    currentUser ? currentUser.id : "",
    userId
  );

  const handleFollow = (e) => {
    e.preventDefault();
    follow(currentUser.id, userId);
  };

  const handleUnfollow = (e) => {
    e.preventDefault();
    unfollow(currentUser.id, userId);
  };

  if (!userData) return "loading...";

  return (
    <>
      <img src={userData.profilePic} alt="" width={150} height={150} />
      <p>{userData.username}</p>
      <p>{userData.name}</p>
      <p>{userData.bio}</p>
      {aFollower ? (
        <button onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </>
  );
};

export default User;
