// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4A2E-9X9g0Sr3E1nEnyZq45-JLoaGfpU",
    authDomain: "daglarapp.firebaseapp.com",
    databaseURL: "https://daglarapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "daglarapp",
    storageBucket: "daglarapp.appspot.com",
    messagingSenderId: "895279237815",
    appId: "1:895279237815:web:3527c6d71a3f366d84db32",
    measurementId: "G-HGL71B1NH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);