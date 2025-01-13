// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1Cou2hmM5VNOsfHqUqpF5GGclVqW5jeU",
  authDomain: "authapptechouse.firebaseapp.com",
  projectId: "authapptechouse",
  storageBucket: "authapptechouse.firebasestorage.app",
  messagingSenderId: "924855965297",
  appId: "1:924855965297:web:76ca4fad8382cc2c976dd0",
  measurementId: "G-FCF82V0WH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

