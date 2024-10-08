import React from "react";
import styles from "../../components/onBoarding/onBoardingStyled.module.css";
import Steps from "./Steps";

const OnBoardingCard = ({ userData }) => {
  return (
    <div className={`${styles.section} ${styles.box}`} id="basic-details">
      <Steps userData={userData}/>
    </div>
  );
};

export default OnBoardingCard;
