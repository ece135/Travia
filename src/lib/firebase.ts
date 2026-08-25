import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACMUJDGBoWBdm268OfsQZlcdw6pnfws9I",
  authDomain: "travia-c6de0.firebaseapp.com",
  projectId: "travia-c6de0",
  storageBucket: "travia-c6de0.firebasestorage.app",
  messagingSenderId: "156980449168",
  appId: "1:156980449168:web:0e61a9c740233d702a6d15",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);