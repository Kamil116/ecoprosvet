// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4iNfdjJRFeaIhRLjfIHnMKR0xYwmkHmo",
    authDomain: "ecoprosvet-24089.firebaseapp.com",
    projectId: "ecoprosvet-24089",
    storageBucket: "ecoprosvet-24089.appspot.com",
    messagingSenderId: "388657724551",
    appId: "1:388657724551:web:26a6c3cfcf69f52ce3cc22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };