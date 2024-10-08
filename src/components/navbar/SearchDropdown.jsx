import React, { useState } from "react";
import styles from "./navbarStyles.module.css";
import { useSearchUsers } from "../../lib/hooks/userHooks";
import { Link } from "react-router-dom";

const SearchDropdown = ({ searchText, setSearchText }) => {
  console.log("refetch");

  const { users, loading, refetch } = useSearchUsers(searchText);

  return (
    <div className={styles.dropdownSearch}>
      {!loading ? (
        users.length ? (
          users.map((user) => (
            <Link to={`/user/${user.id}`} className={styles.userInSearch} onClick={()=>setSearchText('')}>
              <img src={user.profilePic} alt="user profile pic" />
              <div className={styles.userInfo}>
                <p className={styles.name}>{user.name}</p>
                <p>{user.username}</p>
              </div>
            </Link>
          ))
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <p>No results found.</p>
          </div>
        )
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

export default SearchDropdown;
