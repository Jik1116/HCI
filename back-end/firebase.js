// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdiDavMCbaDUpBRvrTJjqeUXoj_VDxg-0",
  authDomain: "sparkstyle.firebaseapp.com",
  projectId: "sparkstyle",
  storageBucket: "sparkstyle.appspot.com",
  messagingSenderId: "789876522013",
  appId: "1:789876522013:web:d70a2e9e353b6084a19af4",
  measurementId: "G-H9N76CL7FR"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export {firebaseApp, auth}
