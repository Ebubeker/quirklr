import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context/AuthContext";
import { useGetUserById } from "../../lib/hooks/userHooks";

import { User as UserComponent } from "../../components/userProfile/User";
import UserPosts from "../../components/userProfile/UserPosts";

const User = () => {
  const { userId } = useParams();
  const { userData } = useGetUserById(userId);

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
