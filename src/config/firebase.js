// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_apiKey,
    authDomain: process.env.REACT_APP_FIREBASE_authDomain,
    projectId: process.env.REACT_APP_FIREBASE_projectId,
    storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
    messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
    appId: process.env.REACT_APP_FIREBASE_appId,
    measurementId: process.env.REACT_APP_FIREBASE_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const firestore = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { firestore, auth, storage }