import React, { useState } from "react";
import ChevronRight from "../../lib/assets/icons/ChevronRight";
import ChevronLeft from "../../lib/assets/icons/ChevronLeft";
import styles from "./feedStyles.module.css";

const ImageMedia = ({ src, currCarouselPosition, indx }) => {
  return (
    <img
      src={src}
      alt="image"
      className={styles.postMedia}
      style={{ display: indx !== currCarouselPosition ? "none" : undefined }}
    />
  );
};

const VideoMedia = ({ src, currCarouselPosition, indx }) => {
  return (
    <video
      controls={false}
      autoPlay
      muted
      className={styles.postMedia}
      style={{ display: indx !== currCarouselPosition ? "none" : undefined }}
      loop
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

const MediaContent = ({ media }) => {
  const [currCarouselPosition, setCurrCarouselPosition] = useState(0);

  return (
    <>
      {media.length > 1 ? (
        <div className={styles.carousel}>
          {currCarouselPosition !== 0 ? (
            <div
              className={styles.arrow}
              style={{
                left: "-13px",
              }}
              onClick={() => {
                setCurrCarouselPosition(currCarouselPosition - 1);
              }}
            >
              <ChevronLeft width={12} height={12} />
            </div>
          ) : null}
          {media.length !== currCarouselPosition + 1 ? (
            <div
              className={styles.arrow}
              style={{
                right: "-13px",
              }}
              onClick={() => {
                setCurrCarouselPosition(currCarouselPosition + 1);
              }}
            >
              <ChevronRight width={12} height={12} />
            </div>
          ) : null}
          {media.map((mediaContent, indx) =>
            mediaContent.type === "image" ? (
              <ImageMedia
                src={mediaContent.img}
                currCarouselPosition={currCarouselPosition}
                indx={indx}
              />
            ) : (
              <VideoMedia
                src={mediaContent.img}
                currCarouselPosition={currCarouselPosition}
                indx={indx}
              />
            )
          )}
        </div>
      ) : (
        <>
          {media[0].type === "image" ? (
            <ImageMedia src={media[0].img} indx={0} currCarouselPosition={0} />
          ) : (
            <VideoMedia src={media[0].img} currCarouselPosition={0} indx={0} />
          )}
        </>
      )}
    </>
  );
};

export default MediaContent;
