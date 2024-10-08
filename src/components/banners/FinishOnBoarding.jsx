import React, {useContext} from "react";
import styled from "./finishOnBoardingStyles.module.css";
import EditPen from "../../lib/assets/icons/EditPen";
import { Context } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const FinishOnBoarding = () => {
  const { userData } = useContext(Context);

  return userData && !userData.onBoarding ? (
    <div className={styled.banner}>
      <div>
        <p className={styled.title}>Onboarding incomplete.</p>
        <p className={styled.subtitle}>Make sure to complete all the information about your account so that others can find out about you.</p>
        <Link to="/onBoarding" className={styled.button}>Complete</Link>
      </div>
      <div className={styled.icon}>
        <img src={userData.profilePic}  />
        <EditPen width="32px" height="32px" color={"#113A63"}/>
      </div>
    </div>
  ) : null;
};

export default FinishOnBoarding;
