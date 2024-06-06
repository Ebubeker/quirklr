import { db } from "../../firebase";
import { addDoc, collection, doc, orderBy, query, where } from "firebase/firestore";
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

  addDoc(collection(db, "posts"), post)
}

export const getAllPostsQuery = (userId) => {
  //where("createdBy", "!=", userId)
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
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
    postId: postId
  }).then((commentId) => {
    updatePostData(postId, { comments: [...comments, commentId] })
  })
}

export const getCommentsBasedOnPost = (postId) => {
  const q = query(collection(db, "comments"), where("postId", "==", postId), orderBy("createdAt", "desc"));
  return q;
}