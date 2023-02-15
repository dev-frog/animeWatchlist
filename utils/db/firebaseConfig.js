import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0cRHRZjtVUOdK0wets_mG0pK47WRuZjY",
  authDomain: "watchlist-89e54.firebaseapp.com",
  projectId: "watchlist-89e54",
  storageBucket: "watchlist-89e54.appspot.com",
  messagingSenderId: "710241816825",
  appId: "1:710241816825:web:b7205255ec17430ce59228",
  measurementId: "G-GJ2YZSE3GK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// add name to firebase database

const db = getFirestore(app);

const storage = getStorage(app);

export { storage, db };
