import { useState } from "react";
import SearchIcon from "../../lib/assets/icons/SearchIcon";
import styles from "./searchMobile.module.css";
import { useSearchUsers } from "../../lib/hooks/userHooks";
import { Link } from "react-router-dom";
import CloseIcon from "../../lib/assets/icons/CloseIcon";

const SearchMobile = ({closeModal}) => {
  const [searchText, setSearchText] = useState("");

  const { users, loading, refetch } = useSearchUsers(searchText);

  return (
    <div className={styles.searchMobile}>
      <div className={styles.closeIcon} onClick={()=>closeModal()}>
        <CloseIcon width={15}/>
      </div>
      <div className={styles.searchWrapper}>
        <SearchIcon width={20} height={20} color="#8e8e8ec4" />
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className={styles.usersList}>
        {!loading ? (
          users.length ? (
            users.map((user) => (
              <Link
                to={`/user/${user.id}`}
                className={styles.userInSearch}
                onClick={()=>{
                  closeModal()
                  setSearchText("")
                }}
              >
                <img src={user.profilePic} alt="user profile pic" />
                <div className={styles.userInfo}>
                  <p className={styles.name}>{user.name}</p>
                  <p>{user.username}</p>
                </div>
              </Link>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p>No results found.</p>
            </div>
          )
        ) : (
          <div className="loader"></div>
        )}
      </div>
    </div>
  );
};

export default SearchMobile;
