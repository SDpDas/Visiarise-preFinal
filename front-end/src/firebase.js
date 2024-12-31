// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the Auth service
import { getDatabase } from "firebase/database"; // Import Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp1gOaw6vb94tyRZss2F5r4GS0dG11xGo",
  authDomain: "visiarise-72e39.firebaseapp.com",
  databaseURL: "https://visiarise-72e39-default-rtdb.firebaseio.com/", // Ensure this matches your Realtime Database URL
  projectId: "visiarise-72e39",
  storageBucket: "visiarise-72e39.appspot.com",
  messagingSenderId: "110598892348",
  appId: "1:110598892348:web:06c8240d5bf86c7f030c39",
  measurementId: "G-9N8QRXC913"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Initialize the Realtime Database
const auth = getAuth(app); // Initialize the Auth service

export { app, db, auth }; // Now exporting auth as well
