import imageCompression from "browser-image-compression";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { Context } from "../../context/AuthContext";
import { storage } from "../../firebase";
import { createPost } from "../../lib/api/post";
import MediaIcon from "../../lib/assets/images/media.png";
import ShowImagePreview from "./ShowImagePreview";
import styled from "./styles.module.css";
import { useDeviceType } from "../../lib/hooks/device-type";
import toast from "react-hot-toast";

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

const SharePostContainer = () => {
  const isMobile = useDeviceType();

  const [imageShow, setImageShow] = useState([]);
  const [contentType, setContentType] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [content, setContent] = useState("");
  const [error, setError] = useState(undefined);

  const { userData } = useContext(Context);

  const navigate = useNavigate();

  const handlePostSumbit = (e) => {
    e.preventDefault();

    if (imageShow && content.length) {
      const media = imageShow.map((img, indx) => ({
        img: img,
        type: contentType[indx] === "mp4" ? "video" : "image",
      }));

      createPost(media, content, userData.id)
        .then(() => {
          toast.success('Post was created successfully')
          setImageShow([]);
          setContentType([]);
          setContent("");
          setError(undefined);
          navigate("/profile");
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      setError("please fill all the fields");
    }
  };

  async function uploadImage(image, type) {
    const storageRef = ref(storage, `/posts/${v4()}`);

    try {
      const compressedFile =
        type === "image" ? await imageCompression(image, options) : image;
      const response = await uploadBytes(storageRef, compressedFile);
      const url = await getDownloadURL(response.ref);
      return url;
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageChange = (e) => {
    e.preventDefault();

    const contentTypes = [];

    const imagePromises = [...e.target.files].map((image, indx) => {
      if (image.type === "video/mp4") {
        contentTypes.push("mp4");
      } else if (image.type.includes("image")) {
        contentTypes.push("image");
      }
      return uploadImage(image, image.type === "video/mp4" ? "mp4" : "image");
    });

    setContentType([...contentType, ...contentTypes]);

    Promise.all(imagePromises).then((data) => {
      setImageShow(data);
    });
  };

  const handleImageDrop = (e) => {
    e.preventDefault();

    const contentTypes = [];

    const imagePromises = [...e.dataTransfer.files].map((image) => {
      if (image.type === "video/mp4") {
        contentTypes.push("mp4");
      } else if (image.type.includes("image")) {
        contentTypes.push("image");
      }
      return uploadImage(image);
    });

    setContentType([...contentType, ...contentTypes]);

    Promise.all(imagePromises).then((data) => {
      setImageShow(data);
    });
  };

  const handleImageChangeAddition = (e) => {
    e.preventDefault();

    const contentTypes = [];

    const imagePromises = [...e.target.files].map((image) => {
      if (image.type === "video/mp4") {
        contentTypes.push("mp4");
      } else if (image.type.includes("image")) {
        contentTypes.push("image");
      }
      return uploadImage(image);
    });

    setContentType([...contentType, ...contentTypes]);

    Promise.all(imagePromises).then((data) => {
      setImageShow([...imageShow, ...data]);
    });
  };

  const handleImageDropAddition = (e) => {
    e.preventDefault();

    const contentTypes = [];

    const imagePromises = [...e.dataTransfer.files].map((image) => {
      if (image.type === "video/mp4") {
        contentTypes.push("mp4");
      } else if (image.type.includes("image")) {
        contentTypes.push("image");
      }
      return uploadImage(image);
    });

    setContentType([...contentType, ...contentTypes]);

    Promise.all(imagePromises).then((data) => {
      setImageShow([...imageShow, ...data]);
    });
  };

  return (
    <div className={styled.container}>
      <label
        className={styled.imageInputWrapper}
        htmlFor="input-file"
        onDrop={handleImageDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          id="input-file"
          accept="image/*,video/*"
          multiple
          hidden
          disabled={imageShow && imageShow.length}
          onChange={handleImageChange}
        />
        {imageShow && imageShow.length ? (
          <ShowImagePreview
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            images={imageShow}
            setImages={setImageShow}
            handleImageDrop={handleImageDropAddition}
            handleImageChange={handleImageChangeAddition}
            contentType={contentType}
            setContentType={setContentType}
          />
        ) : (
          <img src={MediaIcon} alt="Media Post" />
        )}
      </label>
      {isMobile && imageShow.length >= 3 ? (
        <p onClick={()=>setIsOpen(true)}>Add more +</p>
      ) : null}
      <div className={styled.textAndAction}>
        <textarea
          cols="30"
          rows="10"
          placeholder="post content..."
          className={styled.postTextArea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {error ? <div>{error}</div> : null}
        <button className={styled.button} onClick={handlePostSumbit}>
          Create Post
        </button>
      </div>
    </div>
  );
};

export default SharePostContainer;
