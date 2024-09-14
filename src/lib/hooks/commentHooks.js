import { useState, useEffect } from "react"
import { getCommentsBasedOnPost } from "../api/post";
import { onSnapshot } from "firebase/firestore";
import { getUserById } from "../api/user";

export const useGetComments = (postId) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (postId) {
      onSnapshot(getCommentsBasedOnPost(postId), async (snapshot) => {
        setComments([])
        const fetchedComments = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        
        const commentsWithUserData = await Promise.all(fetchedComments.map(async (comment) => {
          const userData = await getUserById(comment.createdBy);
          return { user: {...userData.data(), id: userData.id}, ...comment };
        }));
        
        setComments(commentsWithUserData);
        // setComments(fetchedComments)
      })
    } else {
      setComments([])
    }

  }, [postId])


  return { comments }
} 