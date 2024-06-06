import React, { useState, useContext } from "react";
import { storage } from "../../firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { createPost } from "../../lib/api/post";
import { Context } from "../../context/AuthContext";
import { v4 } from "uuid";
import styles from "./feedStyles.module.css"
import UploadIcon from "../../lib/assets/icons/UploadIcon";

const CreatePostForm = () => {
  // const [imageFile, setImageFile] = useState(undefined);
  const [imageShow, setImageShow] = useState(undefined);
  const [content, setContent] = useState(undefined);
  const [error, setError] = useState(undefined);

  const { userData } = useContext(Context);

  const handlePostSumbit = (e) => {
    e.preventDefault();

    if (imageShow && content) {
      createPost(imageShow, content, userData.id);
    } else {
      setError("please fill all the fields")
    }
  };

  const handleImageChange = (e) => {
    const imageRef = ref(storage, `posts/${v4()}`);
    uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageShow(url);
      });
    });
  };

  return (
    <div className={styles.gridCard}>
      <p className={styles.cardTitle}>Share a post</p>
      <form onSubmit={handlePostSumbit} className={styles.createPost}>
        <div >
          <input type="file" name="file-input" id="file-input" onChange={handleImageChange} className={styles.fileInput}/>
          <label className={styles.fileLabel} for="file-input">
            <UploadIcon width={"20px"}/>
            <span>Upload file</span>
          </label>
        </div>
        <textarea
          cols="30"
          rows="10"
          placeholder="post content..."
          className={styles.postTextArea}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {error ? <div>{error}</div> : null}
        <button className={styles.button}>Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
