import { useState, useEffect } from "react"
import { getAllPostsQuery } from "../api/post";
import { onSnapshot } from "firebase/firestore";

export const useGetPosts = (userId) => {
  const [posts, setPosts] = useState(undefined)

  useEffect(() => {
    if(userId){
      onSnapshot(getAllPostsQuery(userId), (snapshot) => {
        const fetchedPosts = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setPosts(fetchedPosts)
      })
    }else {
      setPosts([])
    }
  }, [userId])

  return { posts }
} 