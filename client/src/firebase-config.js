// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "ui-clone-31b5d.firebaseapp.com",
  projectId: "ui-clone-31b5d",
  storageBucket: "ui-clone-31b5d.appspot.com",
  messagingSenderId: "125094275114",
  appId: "1:125094275114:web:5d3cd509cb5c09d053fb53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const auth = getAuth(app);
