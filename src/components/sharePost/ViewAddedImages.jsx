import React from "react";
import Modal from "react-modal";
import CloseIcon from "../../lib/assets/icons/CloseIcon";
import TrashBinIcon from "../../lib/assets/icons/TrashBinIcon";
import styled from "./styles.module.css";
import MediaIcon from "../../lib/assets/images/media.png";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "70%",
    maxHeight: "70%",
    height: "70%",
    transform: "translate(-50%, -50%)",
    overflowY: "hidden",
  },
};

const ViewAddedImages = ({
  modalIsOpen,
  setIsOpen,
  setSelectedImage,
  images,
  deleteImageFromSelection,
  handleImageDrop,
  handleImageChange,
  contentType,
}) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className={styled.header}>
        <p>Uploaded Content</p>
        <div onClick={closeModal}>
          <CloseIcon width="24px" height="24px" />
        </div>
      </div>
      <div className={styled.imagesModalGrid}>
        {images.map((image, indx) =>
          contentType[indx] === "mp4" ? (
            <div
              className={styled.uploadedContentGridElement}
              key={indx}
              onClick={(e) => {
                const divChildren = e.currentTarget.querySelectorAll("div");
                if (divChildren.length && e.target.tagName !== "DIV") {
                  setSelectedImage(image);
                }
              }}
            >
              <video controls className={styled.videoPreview}>
                <source src={image} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div
                className={styled.editingBarVideo}
                style={{ height: "fit-content" }}
              >
                <span onClick={() => deleteImageFromSelection(image)}>
                  <TrashBinIcon width="24px" height="24px" color="#F44336" />
                </span>
              </div>
            </div>
          ) : (
            <div
              className={StyleSheet.uploadedContentGridElement}
              key={indx}
              style={{
                backgroundImage: `url("${image}")`,
                position: "relative",
              }}
              onClick={(e) => {
                const divChildren = e.target.querySelectorAll("div");
                if (divChildren.length) {
                  setSelectedImage(image);
                }
              }}
            >
              <div className={styled.editingBar}>
                <span onClick={() => deleteImageFromSelection(image)}>
                  <TrashBinIcon width="24px" height="24px" color="#F44336" />
                </span>
              </div>
            </div>
          )
        )}
        <label
          className={styled.gridImageAdd}
          htmlFor="add-absolute-file"
          onDrop={handleImageDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="file"
            id="add-absolute-file"
            accept="image/*,video/*"
            multiple
            hidden
            onChange={handleImageChange}
          />
          <span>
            <img src={MediaIcon} alt="Media Post" width={150} />
          </span>
        </label>
      </div>
    </Modal>
  );
};

export default ViewAddedImages;
