// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDkui_0QlZYaVBrnnsrhlXae9sL3tp96Y0",
  authDomain: "socialmedianew-75caa.firebaseapp.com",
  projectId: "socialmedianew-75caa",
  storageBucket: "socialmedianew-75caa.appspot.com",
  messagingSenderId: "621907115528",
  appId: "1:621907115528:web:0e650916c9a71b5826dbbd",
  measurementId: "G-HM04S5MPG5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//! exports

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;