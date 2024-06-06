import React from "react";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useGetUserData } from "../../lib/hooks/userHooks";
import { useContext } from "react";
import { Context } from "../../context/AuthContext";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { userData } = useContext(Context);

  async function handleSignOut() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  if(!userData) return <p>loading...</p>

  return (
    <div>
      <img src={userData.profilePic} alt="" width={150} height={150}/>
      <p>{userData.username}</p>
      <p>{userData.name}</p>
      <p>{userData.bio}</p>
      <div onClick={() => handleSignOut()}>Log Out</div>
    </div>
  );
};

export default Profile;
