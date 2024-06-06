import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserDataQuery } from "../lib/api/user";
import { onSnapshot } from "firebase/firestore";

export const Context = createContext()

export function AuthContext({ children }) {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false)
      if (currentUser) {
        setUser(currentUser)
        onSnapshot(getUserDataQuery(currentUser.email), (snapshot)=> {
          setUserData({...snapshot.docs[0].data(), id: snapshot.docs[0].id})
        })
      } else {
        setUser(false)
      }
    })
    return () => {
      if (unsubscribe) unsubscribe();
    }
  }, []);

  const values = {
    user: user,
    setUser: setUser,
    userData: userData,
  }

  return <Context.Provider value={values}>{!loading && children}</Context.Provider>

}