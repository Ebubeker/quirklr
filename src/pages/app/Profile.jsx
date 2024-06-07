import React from "react";
import { User } from "../../components/userProfile/User";
import UserPosts from "../../components/userProfile/UserPosts";
import { useContext } from "react";
import { Context } from "../../context/AuthContext";

const Profile = () => {
  const { userData } = useContext(Context);
  if (!userData) return <p>loading...</p>;

  return (
    <div style={{ minHeight: "calc(100vh - 64px)" }}>
      <User userData={userData} profile>
        <UserPosts userId={userData.id} />
      </User>
    </div>
  );
};

export default Profile;
