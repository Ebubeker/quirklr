import { db } from "../../firebase"
import { addDoc, collection, doc, deleteDoc, query, where, getDocs, getDoc, limit, orderBy } from "firebase/firestore";
import { v4 } from "uuid";
import { onSnapshot } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { Firestore } from "firebase/firestore";

export const registerUserInDatabase = (email) => {
  addDoc(collection(db, "users"), {
    username: `user.${v4()}`,
    // password: password,
    email: email,
    name: "",
    bio: "",
    profilePic: "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
    birthday: '2000-10-20',
    onBoarding: false
  });
}

export const getUserByIdQuery = (id) => {
  return doc(db, "users", id)
}

export const getUserById = async (id) => {
  return await getDoc(doc(db, "users", id))
}

export const getUsers = (searchQuery) => {
  // Start with the base query
  let q = query(collection(db, "users"));

  // If searchQuery is provided, add a 'where' clause to filter by the query
  if (searchQuery) {
    q = query(collection(db, "users"), where("username", ">=", searchQuery), where("username", "<=", searchQuery + "\uf8ff"));
  }

  return q;
};



export const getUserDataQuery = (email) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  return q
}

export const updateUserData = (id, data) => {
  updateDoc(doc(db, 'users', id), data)
}

export const follow = (userId, targetId) => {
  addDoc(collection(db, "follows"), {
    user: userId,
    targetId: targetId
  })
}

export const unfollow = async (userId, targetId) => {
  const q = query(collection(db, "follows"), where("user", "==", userId), where("targetId", "==", targetId))
  const docSnap = await getDocs(q);
  docSnap.forEach((doc) => {
    deleteDoc(doc.ref);
  });
}

export const checkIfIFollow = (userId, targetId) => {
  const q = query(collection(db, "follows"), where("user", "==", userId), where("targetId", "==", targetId));
  return q;
}

export const getFollowingList = (userId) => {
  const q = query(collection(db, "follows"), where("user", "==", userId));
  return q;
}

export const getFollowersList = (userId) => {
  const q = query(collection(db, "follows"), where("targetId", "==", userId));
  return q;
}

export const getUserDataBasedOnIds = (ids) => {
  const q = query(collection(db, "users"), where(Firestore.FieldPath.documentId(), "in", ids));
  return q
}