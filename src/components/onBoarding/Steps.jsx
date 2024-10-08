import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { default as React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import { updateUserData } from "../../lib/api/user";
import styled from "./onBoardingStyled.module.css";

const Steps = ({ userData }) => {
  const [currentSteps, setCurrentStep] = useState(0);
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

  const handleBioChange = () => {
    updateUserData(userData.id, {
      bio: bio,
      onBoarding: true,
    });

    navigate("/profile");
  };

  const handleNameAndUsernameUpdate = () => {
    updateUserData(userData.id, {
      username: username,
      name: name,
    });
  };

  const submitImage = (img) => {
    // e.preventDefault();
    if (!img) return;

    const imageRef = ref(storage, `profile/${v4()}`);
    uploadBytes(imageRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateUserData(userData.id, {
          profilePic: url,
        });
      });
    });
  };

  switch (currentSteps) {
    case 0:
      return (
        <>
          <h2>Add a profile image</h2>
          <div className={styled.stepWrapper}>
            <div className={styled.stepContent}>
              <label
                style={{
                  backgroundImage: `url(${userData.profilePic})`,
                }}
                className={styled.profileImage}
                htmlFor="input-file"
                onChange={(e) => submitImage(e.target.files[0])}
              >
                <input
                  type="file"
                  id="input-file"
                  accept="image/*,video/*"
                  hidden
                />
              </label>
              <label
                className={styled.button}
                style={{
                  margin: "auto",
                  marginTop: "30px",
                  display: "block",
                }}
                htmlFor="input-file"
                onChange={(e) => submitImage(e.target.files[0])}
              >
                <input
                  type="file"
                  id="input-file"
                  accept="image/*,video/*"
                  hidden
                />
                Change
              </label>
            </div>
            <div className={styled.actionsButtons}>
              <div className={styled.button} onClick={() => setCurrentStep(1)}>
                Next
              </div>
              <div className={styled.button} onClick={() => setCurrentStep(1)}>
                Skip
              </div>
            </div>
          </div>
        </>
      );
    case 1:
      return (
        <>
          <h2>Add Name and Username</h2>
          <div className={styled.stepWrapper}>
            <div
              className={styled.stepContent}
              style={{
                width: "100%",
              }}
            >
              <div
                className={styled.rowInput}
                style={{
                  marginTop: "30px",
                }}
              >
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`${styled["small-input"]}`}
                />
              </div>

              <div className={styled.rowInput}>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${styled["small-input"]}`}
                />
              </div>
            </div>
            <div className={styled.actionsButtons}>
              <div
                className={styled.button}
                onClick={() => {
                  handleNameAndUsernameUpdate();
                  setCurrentStep(2);
                }}
              >
                Next
              </div>
              <div
                className={styled.button}
                onClick={() => {
                  setCurrentStep(2);
                }}
              >
                Skip
              </div>
            </div>
          </div>
        </>
      );
    case 2:
      return (
        <>
          <h2>Add Bio</h2>
          <div className={styled.stepWrapper}>
            <div
              className={styled.stepContent}
              style={{
                width: "100%",
              }}
            >
              <div
                className={styled.rowInput}
                style={{
                  marginTop: "20px",
                }}
              >
                <textarea
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  cols="30"
                  rows="5"
                  className={`${styled["small-input"]}`}
                />
              </div>
            </div>
            <div className={styled.actionsButtons}>
              <div
                className={styled.button}
                onClick={() => {
                  handleBioChange();
                }}
              >
                Finish
              </div>
            </div>
          </div>
        </>
      );
    default:
      break;
  }
};

export default Steps;
