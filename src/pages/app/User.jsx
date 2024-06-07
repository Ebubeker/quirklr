import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useGetUserById, useCheckIfIFollow } from "../../lib/hooks/userHooks";
import { Context } from "../../context/AuthContext";
import { follow, unfollow } from "../../lib/api/user";

import {User as UserComponent} from "../../components/userProfile/User";
import UserPosts from "../../components/userProfile/UserPosts";

const User = () => {
  const { userId } = useParams();
  const { userData: currentUser } = useContext(Context);

  const { userData } = useGetUserById(userId);
  const { aFollower } = useCheckIfIFollow(
    currentUser ? currentUser.id : "",
    userId
  );

  

  if (!userData) return "loading...";

  return (
    <div style={{ minHeight: "calc(100vh - 64px)" }}>
      <UserComponent userData={userData} >
        <UserPosts userId={userData.id}/>
      </UserComponent>
    </div>
  );
};

export default User;
