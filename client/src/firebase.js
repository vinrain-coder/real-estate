// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "find-house-5a5d1.firebaseapp.com",
  projectId: "find-house-5a5d1",
  storageBucket: "find-house-5a5d1.firebasestorage.app",
  messagingSenderId: "1009971589639",
  appId: "1:1009971589639:web:2f3a5ecf4d3c320cfaf0a2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);