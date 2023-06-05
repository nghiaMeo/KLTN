// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
const firebaseConfig = {
  apiKey: "AIzaSyDW2Yxhs4yNMDoXGTtN5pUsAzsyddUFzWY",
  authDomain: "esp-32-connection-89b83.firebaseapp.com",
  databaseURL: "https://esp-32-connection-89b83-default-rtdb.firebaseio.com",
  projectId: "esp-32-connection-89b83",
  storageBucket: "esp-32-connection-89b83.appspot.com",
  messagingSenderId: "604977963697",
  appId: "1:604977963697:web:aa250e6b31a8e6cc497890",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

