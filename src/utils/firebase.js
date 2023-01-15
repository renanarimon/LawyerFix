// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBb7DJUPiNS8L9DSEv1AwrANy9yY--ocG0",
  authDomain: "lawyerfix-a13e6.firebaseapp.com",
  databaseURL: "https://lawyerfix-a13e6-default-rtdb.firebaseio.com",
  projectId: "lawyerfix-a13e6",
  storageBucket: "lawyerfix-a13e6.appspot.com",
  messagingSenderId: "906126041218",
  appId: "1:906126041218:web:6ef3265fbf255aab39949b",
  measurementId: "G-N6VSD61K4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);