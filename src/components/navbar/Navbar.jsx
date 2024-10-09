import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./navbarStyles.module.css";
import { Context } from "../../context/AuthContext";
import SearchIcon from "../../lib/assets/icons/SearchIcon";
import SearchDropdown from "./SearchDropdown";
import { useDeviceType } from "../../lib/hooks/device-type";
import SearchMobile from "./SearchMobile";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearchMobileOpen, setIsSearchMobileOpen] = useState("");
  const { userData } = useContext(Context);

  const isMobile = useDeviceType();

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <p className={styles.logo}>
          <Link to="/">
            <span style={{ color: "#FF0000" }}>Q</span>uirklr
          </Link>
        </p>
        <div
          className={styles.searchWrapper}
          onClick={() => setIsSearchMobileOpen(true)}
        >
          <SearchIcon width={20} height={20} color="#8e8e8ec4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {isMobile ? null : (
            <SearchDropdown
              searchText={searchText}
              setSearchText={setSearchText}
            />
          )}
        </div>
        {userData ? (
          <div className={styles.profile}>
            <Link to="/profile">
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
      {isMobile && isSearchMobileOpen ? (
        <SearchMobile closeModal={() => setIsSearchMobileOpen(false)} />
      ) : null}
    </div>
  );
};

export default Navbar;
