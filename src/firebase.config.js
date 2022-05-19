import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcrXNKkfcBEkW5VTktWV9worI8OXDXrEw",
    authDomain: "cars-67b0b.firebaseapp.com",
    projectId: "cars-67b0b",
    storageBucket: "cars-67b0b.appspot.com",
    messagingSenderId: "1001150488617",
    appId: "1:1001150488617:web:515df869fc6c3bf8457c38"
};

// // Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
