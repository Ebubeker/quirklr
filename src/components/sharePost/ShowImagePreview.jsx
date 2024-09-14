import React, { useState } from "react";
import OpenImageFullScreenView from "./OpenImageFullScreenView";
import ViewAddedImages from "./ViewAddedImages";
import styles from "./styles.module.css";
import TrashBinIcon from "../../lib/assets/icons/TrashBinIcon";
import { storage } from "../../firebase";
import { deleteObject } from "firebase/storage";
import { ref } from "firebase/storage";
import MediaIcon from "../../lib/assets/images/media.png";

const MediaContent = ({
  type,
  src,
  className,
  deleteImageFromSelection,
  onClick,
  length,
  setSelectedImage,
}) => {
  if (type === "image" && length > 5) {
    return (
      <div className={className} onClick={() => (onClick ? onClick() : null)}>
        <div
          style={{
            backgroundImage: `url("${src}")`,
          }}
          className={styles.blurredImage}
        >
          <div className={styles.editingBar}>
            <span onClick={() => deleteImageFromSelection(src)}>
              <TrashBinIcon width="24px" height="24px" color="#F44336" />
            </span>
          </div>
        </div>
        {length > 5 ? (
          <div className={styles.moreText}>
            <p>{length - 5}</p>
          </div>
        ) : null}
      </div>
    );
  }

  return type === "image" ? (
    <div
      style={{
        backgroundImage: `url("${src}")`,
      }}
      className={className}
      onClick={(e) => {
        if (onClick) {
          onClick();
          return;
        }
        const divChildren = e.target.querySelectorAll("div");
        if (divChildren.length) {
          setSelectedImage(src);
        }
      }}
    >
      <div className={styles.editingBar}>
        <span onClick={() => deleteImageFromSelection(src)}>
          <TrashBinIcon width="24px" height="24px" color="#F44336" />
        </span>
      </div>
    </div>
  ) : (
    <div
      className={className}
      onClick={(e) => {
        if (onClick) {
          onClick();
          return;
        }
        const divChildren = e.currentTarget.querySelectorAll("div");
        if (divChildren.length && e.target.tagName !== 'DIV') {
          setSelectedImage(src);
        }
      }}
    >
      <video controls className={styles.video}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.editingBarVideo}>
        <span onClick={() => deleteImageFromSelection(src)}>
          <TrashBinIcon width="24px" height="24px" color="#F44336" />
        </span>
      </div>
      {length > 5 ? (
        <div className={styles.moreText}>
          <p>{length - 5}</p>
        </div>
      ) : null}
    </div>
  );
};

const ShowImagePreview = ({
  images,
  setImages,
  handleImageDrop,
  handleImageChange,
  contentType,
  setContentType,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(undefined);

  const deleteImageFromSelection = (imageToDelete) => {
    const index = images.indexOf(imageToDelete);
    const newImageList = images.filter((img) => img !== imageToDelete);
    const newTypesList = contentType.filter((_, indx) => index !== indx);
    const imageReferenceLink = imageToDelete.split("%2F")[1].split("?alt")[0];
    deleteImageInStorage(imageReferenceLink);
    setContentType(newTypesList);
    setImages(newImageList);
  };

  const deleteImageInStorage = (imageReferenceLink) => {
    const storageRef = ref(storage, `/posts/${imageReferenceLink}`);
    deleteObject(storageRef)
      .then(() => {
        console.log("image deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.images}>
      {images.length === 1 ? (
        <MediaContent
          type={contentType[0]}
          src={images[0]}
          className={styles.oneImage}
          deleteImageFromSelection={deleteImageFromSelection}
          setSelectedImage={setSelectedImage}
        />
      ) : null}
      {images.length > 1 ? (
        images.length === 2 ? (
          <>
            <MediaContent
              type={contentType[0]}
              src={images[0]}
              className={styles.twoImages}
              deleteImageFromSelection={deleteImageFromSelection}
              setSelectedImage={setSelectedImage}
            />
            <MediaContent
              type={contentType[1]}
              src={images[1]}
              className={styles.twoImages}
              deleteImageFromSelection={deleteImageFromSelection}
              setSelectedImage={setSelectedImage}
            />
          </>
        ) : (
          <>
            <MediaContent
              type={contentType[0]}
              src={images[0]}
              className={styles.twoImages}
              deleteImageFromSelection={deleteImageFromSelection}
              setSelectedImage={setSelectedImage}
            />
            <>
              <>
                <MediaContent
                  type={contentType[1]}
                  src={images[1]}
                  className={styles.threeImages}
                  deleteImageFromSelection={deleteImageFromSelection}
                  setSelectedImage={setSelectedImage}
                />
                <MediaContent
                  type={contentType[2]}
                  src={images[2]}
                  className={styles.threeImages}
                  deleteImageFromSelection={deleteImageFromSelection}
                  setSelectedImage={setSelectedImage}
                />
              </>
              <>
                {images.length >= 4 && (
                  <MediaContent
                    type={contentType[3]}
                    src={images[3]}
                    className={styles.threeImages}
                    deleteImageFromSelection={deleteImageFromSelection}
                    setSelectedImage={setSelectedImage}
                  />
                )}
                {images.length === 5 ? (
                  <MediaContent
                    type={contentType[4]}
                    src={images[4]}
                    className={styles.threeImages}
                    deleteImageFromSelection={deleteImageFromSelection}
                    setSelectedImage={setSelectedImage}
                  />
                ) : images.length > 5 ? (
                  <MediaContent
                    onClick={() => setIsOpen(true)}
                    type={contentType[4]}
                    src={images[4]}
                    length={images.length}
                    className={styles.morethreeImages}
                    deleteImageFromSelection={deleteImageFromSelection}
                  />
                ) : (
                  <label
                    className={styles.addPost}
                    htmlFor="add-file"
                    onDrop={handleImageDrop}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <input
                      type="file"
                      id="add-file"
                      accept="image/*,video/*"
                      multiple
                      hidden
                      disabled={
                        !images || images.length < 3 || images.length > 4
                      }
                      onChange={handleImageChange}
                    />
                    <span>
                      <img src={MediaIcon} alt="Media Post" width={150} />
                    </span>
                  </label>
                )}
              </>
            </>
          </>
        )
      ) : null}

      {(images && images.length < 3) || images.length === 5 ? (
        <label
          className={styles.absoluteAddition}
          htmlFor="add-absolute-file"
          onDrop={handleImageDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{
            right: images.length === 5 && "unset",
            left: images.length === 5 ? "0" : "unset",
            borderTopRightRadius: images.length === 5 ? "8px" : "unset",
            borderTopLeftRadius: images.length === 5 && "0",
          }}
        >
          <input
            type="file"
            id="add-absolute-file"
            accept="image/*,video/*"
            multiple
            hidden
            disabled={!images || (images.length > 2 && images.length !== 5)}
            onChange={handleImageChange}
          />
          <span>
            <img src={MediaIcon} alt="Media Post" width={150} />
          </span>
        </label>
      ) : null}
      <ViewAddedImages
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        setSelectedImage={setSelectedImage}
        images={images}
        deleteImageFromSelection={deleteImageFromSelection}
        handleImageDrop={handleImageDrop}
        handleImageChange={handleImageChange}
        contentType={contentType}
      />
      <OpenImageFullScreenView
        open={selectedImage}
        closeModal={() => setSelectedImage(undefined)}
        mediaType={selectedImage ? contentType[images.findIndex((img) => img === selectedImage)] : undefined}
      />
    </div>
  );
};

export default ShowImagePreview;
