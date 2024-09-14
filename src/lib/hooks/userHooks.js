import { useState, useEffect } from "react"
import { getUserDataQuery } from "../api/user"
import { onSnapshot } from "firebase/firestore";
import { getUserByIdQuery, checkIfIFollow, getUsers } from "../api/user";
import { getDocs } from "firebase/firestore";

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
    if(currentUser){
      onSnapshot(getUsers(), async (snapshot) => {
        const fetchedUsers = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
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
    }else {
      setUsers([])
    }
  }, [currentUser, followChange])

  return { usersData: users }
}

export const useGetUserById = (userId) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    onSnapshot(getUserByIdQuery(userId), (snapshot) => {
      setUser({ ...snapshot.data(), id: snapshot.id })
    })
  }, [])

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