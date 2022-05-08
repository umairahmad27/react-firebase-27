// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCF8uXmohLhFHFPMUjL-s5PAwPhFJxOEng",
    authDomain: "learn-firebase-27.firebaseapp.com",
    projectId: "learn-firebase-27",
    storageBucket: "learn-firebase-27.appspot.com",
    messagingSenderId: "756642611951",
    appId: "1:756642611951:web:945b5b384733fd749f911a",
    measurementId: "G-N1WH83C46X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)

export { firestore }