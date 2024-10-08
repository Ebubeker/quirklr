import { db } from "../../firebase";
import { addDoc, collection, doc, limit, orderBy, query, where } from "firebase/firestore";
import { v4 } from "uuid";
// import { onSnapshot } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

export const createPost = (img, content, userId) => {
  const post = {
    img: img,
    content: content,
    createdBy: userId,
    likes: [],
    comments: [],
    createdAt: new Date(),
  }

  return addDoc(collection(db, "posts"), post)
}

export const getAllPostsQuery = (userId, limitNr=10) => {
  //where("createdBy", "!=", userId)
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(limitNr));
  return q;
}

export const getAllPostsByUserQuery = (userId) => {
  //where("createdBy", "!=", userId)
  const q = query(collection(db, "posts"), where("createdBy", "==", userId) ,orderBy("createdAt", "desc"));
  return q;
}

export const getFollowingUserPosts = (userIds, limitNr=10) => {
  const q = query(collection(db, "posts"), where("createdBy", "in", userIds) ,orderBy("createdAt", "desc"), limit(limitNr));
  return q;
}

export const updatePostData = (id, data) => {
  updateDoc(doc(db, 'posts', id), data)
}

export const createComment = (userId, comment, postId, comments) => {
  addDoc(collection(db, "comments"), {
    createdBy: userId,
    content: comment,
    createdAt: new Date(),
    postId: postId,
    likes: []
  }).then((commentId) => {
    updatePostData(postId, { comments: [...comments, commentId] })
  })
}

export const updateCommentData = (id, data) => {
  updateDoc(doc(db, 'comments', id), data)
}

export const getCommentsBasedOnPost = (postId) => {
  const q = query(collection(db, "comments"), where("postId", "==", postId), orderBy("createdAt", "desc"));
  return q;
}