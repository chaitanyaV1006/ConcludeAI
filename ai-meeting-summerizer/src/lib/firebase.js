// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0xgP5dJ-sIRcIQlUcROfQC8ErJ9N98ks",
  authDomain: "concludeai-962ed.firebaseapp.com",
  projectId: "concludeai-962ed",
  storageBucket: "concludeai-962ed.firebasestorage.app",
  messagingSenderId: "979860514770",
  appId: "1:979860514770:web:b9e1f4ed187e7792c1ca0b",
  measurementId: "G-E9NR2KTE00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app);