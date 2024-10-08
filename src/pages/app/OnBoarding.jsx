import React, { useContext } from "react";
import OnBoardingCard from "../../components/onBoarding";
import styles from "../../components/onBoarding/onBoardingStyled.module.css";
import { Context } from "../../context/AuthContext";

const OnBoarding = () => {
  const { userData } = useContext(Context);

  if (!userData) {
    return <p>loading...</p>;
  }

  return (
    <div className={styles.onBoardingWrapper}>
      <OnBoardingCard userData={userData} />
    </div>
  );
};

export default OnBoarding;
