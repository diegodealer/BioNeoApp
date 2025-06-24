// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAacGDAQMHN7-tOCFONbgSAnOzCUHBTnq4",
  authDomain: "bioneoapp.firebaseapp.com",
  projectId: "bioneoapp",
  storageBucket: "bioneoapp.firebasestorage.app",
  messagingSenderId: "435838769440",
  appId: "1:435838769440:web:1fd01c7ef25067b12f1f45",
  measurementId: "G-14MXEPT55V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);