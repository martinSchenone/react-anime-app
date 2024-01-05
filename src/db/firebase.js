// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_API_KEY,
  authDomain: "anime-react-app-41c47.firebaseapp.com",
  projectId: "anime-react-app-41c47",
  storageBucket: "anime-react-app-41c47.appspot.com",
  messagingSenderId: "999649005128",
  appId: "1:999649005128:web:e59d705d0c17e9619f927d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
