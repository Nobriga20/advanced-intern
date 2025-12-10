 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf91mAuEQCFkduXIDZOi-byuCgx1REz5k",
  authDomain: "advanced-internship-5bbec.firebaseapp.com",
  projectId: "advanced-internship-5bbec",
  storageBucket: "advanced-internship-5bbec.firebasestorage.app",
  messagingSenderId: "652344166814",
  appId: "1:652344166814:web:e2ee059a26d1a98a3c6e8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)