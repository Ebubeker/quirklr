import { useState, useEffect } from "react"
import { getAllPostsQuery, getAllPostsByUserQuery } from "../api/post";
import { onSnapshot, query, orderBy, limit, startAfter } from 'firebase/firestore';

export const useGetPosts = (userId) => {
  const [posts, setPosts] = useState(undefined)
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(2);

  useEffect(() => {
    if (userId) {
      onSnapshot(getAllPostsQuery(userId, limit), (snapshot) => {
        const fetchedPosts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPosts(fetchedPosts);
        setLoading(false);
      })
    } else {
      setPosts([])
    }
  }, [userId, limit])

  function refetch () {
    setLimit(limit*2)
    setLoading(false)
  }

  return { posts, loading, refetch }
}

export const useGetPostsByUserId = (userId) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (userId) {
      onSnapshot(getAllPostsByUserQuery(userId), (snapshot) => {
        const fetchedPosts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPosts(fetchedPosts)
      })
    } else {
      setPosts([])
    }
  }, [userId])

  return { posts }
} 