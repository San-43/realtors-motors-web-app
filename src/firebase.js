// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWTG97C_vAhJAa8x0lvBlk4gDpU3sCh2Y",
  authDomain: "realtor-motors.firebaseapp.com",
  projectId: "realtor-motors",
  storageBucket: "realtor-motors.firebasestorage.app",
  messagingSenderId: "346757992773",
  appId: "1:346757992773:web:79ea09f88365a138262e2c"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();