import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAdiDavMCbaDUpBRvrTJjqeUXoj_VDxg-0",
  authDomain: "sparkstyle.firebaseapp.com",
  databaseURL: "https://sparkstyle-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sparkstyle",
  storageBucket: "sparkstyle.appspot.com",
  messagingSenderId: "789876522013",
  appId: "1:789876522013:web:d70a2e9e353b6084a19af4",
  measurementId: "G-H9N76CL7FR"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const storage = getStorage();

export { firebaseApp, auth, storage};
