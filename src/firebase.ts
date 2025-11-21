import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC3W4V060V6LIQI5qPXUPfPC4eIGSKy3vc",
  authDomain: "cis371-9e5b2.firebaseapp.com",
  projectId: "cis371-9e5b2",
  storageBucket: "cis371-9e5b2.appspot.com",   // FIXED
  messagingSenderId: "251984419526",
  appId: "1:251984419526:web:1d8867c1d835e31b3055c7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);   // FIXED EXPORT

