// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc} from "firebase/firestore";
import { useContext } from "react";
import authenticationContext from "./context/authenticationContext";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApq8snMvbLLEaZKGe6F7NHGgXTqZG_PZk",
  authDomain: "financely-e9ca6.firebaseapp.com",
  projectId: "financely-e9ca6",
  storageBucket: "financely-e9ca6.appspot.com",
  messagingSenderId: "345429450798",
  appId: "1:345429450798:web:ecaf19e32429a4078dbfbf",
  measurementId: "G-Z36T53M3MV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};