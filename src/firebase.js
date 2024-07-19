// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMnl4wP9Us_4IUsrAoQKkpNoqxQ4DZHPQ",
    authDomain: "booking-app-7787f.firebaseapp.com",
    projectId: "booking-app-7787f",
    storageBucket: "booking-app-7787f.appspot.com",
    messagingSenderId: "813393444703",
    appId: "1:813393444703:web:e0aef681f08044611b40ea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);