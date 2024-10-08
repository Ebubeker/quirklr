import { useState, useEffect } from "react"
import { getAllPostsQuery, getAllPostsByUserQuery, getFollowingUserPosts } from "../api/post";
import { onSnapshot, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { useGetFollowingList } from "./userHooks";

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

  function refetch() {
    setLimit(limit * 2)
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

export const useGetPostsByFollowingList = (userId) => {
  const [posts, setPosts] = useState(undefined)
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);

  const { followingList } = useGetFollowingList(userId);

  useEffect(() => {
    if (followingList && followingList.length) {
      onSnapshot(getFollowingUserPosts(followingList, limit), (snapshot) => {
        const fetchedPosts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPosts(fetchedPosts)
        setLoading(false);
      })
    } else {
      setPosts([])
    }
  }, [userId, followingList, limit])

  function refetch() {
    setLimit(limit * 2)
    setLoading(false)
  }

  return { posts, refetch, loading }
}

export const useGetUserPostsTotalLikes = (userId) => {
  const [totalLikesCount, setTotalLikesCount] = useState(0);
  const { posts } = useGetPostsByUserId(userId)

  useEffect(() => {
    if (posts.length) {
      let totalLikes = 0;
      posts.map((post) => {
        totalLikes += post.likes.length
      })
      setTotalLikesCount(totalLikes)
    } else {
      setTotalLikesCount(0)
    }

  }, [posts])

  return {
    totalLikesCount
  }
}