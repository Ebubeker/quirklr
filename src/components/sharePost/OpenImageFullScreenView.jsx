import React from "react";
import styled from "./styles.module.css";
import CloseIcon from "../../lib/assets/icons/CloseIcon";

const OpenImageFullScreenView = ({ open, closeModal, mediaType }) => {

  if (!open) return null;

  return mediaType === 'mp4' ? (
    <div className={styled.imageModal}>
      <video controls className={styled.videoPreview}>
        <source src={open} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styled.closeIcon} onClick={closeModal}>
        <CloseIcon width="26px" height="26px" />
      </div>
    </div>
  ) : (
    <div className={styled.imageModal}>
      <img src={open} alt="Image Full Screen" />
      <div className={styled.closeIcon} onClick={closeModal}>
        <CloseIcon width="26px" height="26px" />
      </div>
    </div>
  );
};

export default OpenImageFullScreenView;
