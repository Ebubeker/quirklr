import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../context/AuthContext";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { updateUserData } from "../../lib/api/user";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const { userData } = useContext(Context);
  const [imageUpload, setImageUpload] = useState(undefined);
  const [profileImage, setProfileImage] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [bio, setBio] = useState(undefined);
  const [birthday, setBirthday] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setProfileImage(userData.profilePic);
      setUsername(userData.username);
      setName(userData.name);
      setBio(userData.bio);
      setBirthday(userData.birthday);
    }
  }, [userData]);

  const handleUpdate = (e) => {
    e.preventDefault();

    updateUserData(userData.id, {
      profilePic: profileImage,
      username: username,
      name: name,
      bio: bio,
      birthday: birthday,
      onBoarding: true,
    });

    navigate("/profile")
  };

  const submitImage = (e) => {
    e.preventDefault();
    if (!imageUpload) return;

    const imageRef = ref(storage, `profile/${v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setProfileImage(url);
      });
    });
  };

  if (!userData) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => setImageUpload(e.target.files[0])}
        />
        <button onClick={submitImage}>Confirm Image</button>
        <img src={profileImage} alt="profile image" width={150} height={150}/>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        {birthday ? (
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        ) : null}
        <button>Continue</button>
      </form>
    </div>
  );
};

export default OnBoarding;
