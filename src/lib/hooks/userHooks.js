import { getDocs, limit, onSnapshot, query, startAfter } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { checkIfIFollow, getFollowingList, getFollowersList, getUserByIdQuery, getUserDataQuery, getUsers, follow } from "../api/user";

export const useGetUserData = (email) => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onSnapshot(getUserDataQuery(email), (snapshot) => {
      setUser(snapshot.docs[0].data())
    })
  }, [])

  return { userData: user }
}

const getRandomSubset = (array, size) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};

export const useGetRandomUsers = (currentUser, followChange) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (currentUser) {
      onSnapshot(getUsers(), async (snapshot) => {
        const fetchedUsers = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const randomFetchedUsers = getRandomSubset(fetchedUsers, 10);

        // check If I Follow
        const fetchedUsersWithCheckIfIFollow = await Promise.all(randomFetchedUsers.map(async (user) => {
          const userData = await getDocs(checkIfIFollow(currentUser, user.id));

          return {
            ...user,
            following: userData.docs.length ? true : false
          }
        }));
        setUsers(fetchedUsersWithCheckIfIFollow)
      })
    } else {
      setUsers([])
    }
  }, [currentUser, followChange])

  return { usersData: users }
}

export const useSearchUsers = (searchQuery) => {
  const [users, setUsers] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback((searchQuery, loadMore = false, lastVisibleDoc = null) => {
    // Return an empty array if the search query is empty
    if (!searchQuery.trim()) {
      setUsers([]);
      setLastVisible(null); // Reset pagination state
      return () => { }; // Return a no-op function
    }

    setLoading(true);

    const userQuery = getUsers(searchQuery); // Pass the searchQuery to filter users
    console.log(userQuery)
    // let q = query(userQuery, limit(10));

    // // If we are loading more users, start after the last visible user from the previous fetch
    // if (lastVisibleDoc && loadMore) {
    //   q = query(userQuery, startAfter(lastVisibleDoc), limit(10));
    // }

    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      const fetchedUsers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // console.log('fetch user', snapshot.docs)

      if (!snapshot.empty) {
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]); // Set the last visible document for pagination
      }

      setUsers((prevUsers) => (loadMore ? [...prevUsers, ...fetchedUsers] : fetchedUsers));
      setLoading(false);
    });

    return () => unsubscribe(); // Return the snapshot listener cleanup function
  }, []);

  // Fetch initial users when searchQuery changes
  useEffect(() => {
    const unsubscribe = fetchUsers(searchQuery);
    return () => unsubscribe && unsubscribe(); // Ensure we call the cleanup function only if it exists
  }, [searchQuery, fetchUsers]);

  // Refetch function to load more users
  const refetch = () => {
    fetchUsers(searchQuery, true, lastVisible); // Pass lastVisible and true to load more users
  };

  return { users, loading, refetch };
};

export const useGetUserById = (userId) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    onSnapshot(getUserByIdQuery(userId), (snapshot) => {
      setUser({ ...snapshot.data(), id: snapshot.id })
    })
  }, [userId])

  return { userData: user }
}

export const useCheckIfIFollow = (userId, targetId) => {
  const [follow, setFollow] = useState(undefined)


  useEffect(() => {
    if (!userId || !targetId) {
      setFollow(null)
    } else {
      onSnapshot(checkIfIFollow(userId, targetId), (snapshot) => {
        const fetchedFollows = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setFollow(fetchedFollows.length ? true : false)
        // setFollow({ ...snapshot.data(), id: snapshot.id })
      })
    }
  }, [userId, targetId])

  // if (!userId || !targetId) return { aFollower: false }
  // console.log(follow)

  return { aFollower: follow }
}

export const useGetFollowingList = (userId) => {
  const [following, setFollowing] = useState(undefined)
  const [followers, setFollowers] = useState(undefined)

  useEffect(() => {
    if (!userId) {
      setFollowing([])
      setFollowers([])
    } else {
      onSnapshot(getFollowingList(userId), (snapshot) => {
        const fetchedFollowing = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setFollowing(fetchedFollowing.map((following) => following.targetId))
      })
      onSnapshot(getFollowersList(userId), (snapshot) => {
        const fetchedFollowers = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setFollowers(fetchedFollowers.map((follower) => follower.user))
      })
    }
  }, [userId])

  return { followingList: following, followersList: followers }
}

