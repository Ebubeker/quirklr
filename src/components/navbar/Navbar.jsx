import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./navbarStyles.module.css";
import { Context } from "../../context/AuthContext";
import SearchIcon from "../../lib/assets/icons/SearchIcon";

const Navbar = () => {
  const { userData } = useContext(Context);

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <p className={styles.logo}>
          <Link to="/"><span style={{color: "#FF0000"}}>Q</span>uirklr</Link>
        </p>
        <div className={styles.searchWrapper}>
          <SearchIcon width={20} height={20} color="#8e8e8ec4" />
          <input type="text" placeholder="Search..." />
        </div>
        {userData ? (
          <div className={styles.profile}>
            <Link to="/profile" >
              <img
                src={userData.profilePic}
                alt="Profile"
                width={40}
                height={40}
              />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
