import { useState, useEffect } from "react"
import { getAllPostsQuery, getAllPostsByUserQuery } from "../api/post";
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

export const useGetPostsByUserId = (userId) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if(userId){
      onSnapshot(getAllPostsByUserQuery(userId), (snapshot) => {
        console.log("posts refereshed")
        const fetchedPosts = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setPosts(fetchedPosts)
      })
    }else {
      setPosts([])
    }
  }, [userId])

  return { posts }
} 