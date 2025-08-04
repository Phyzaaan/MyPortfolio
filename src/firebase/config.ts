import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHx7YToJOD0Rnws7kD2yf1JyAXSCRPu20",
    authDomain: "my-lil-portfolio.firebaseapp.com",
    projectId: "my-lil-portfolio",
    storageBucket: "my-lil-portfolio.firebasestorage.app",
    messagingSenderId: "1054664721260",
    appId: "1:1054664721260:web:26bb049e7fa57a766aa949",
    measurementId: "G-B8MVGQEKW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the Firestore database service
export const db = getFirestore(app);