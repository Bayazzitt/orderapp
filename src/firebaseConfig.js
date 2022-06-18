
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "kayitsistemi-87108.firebaseapp.com",
  databaseURL: "https://kayitsistemi-87108-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kayitsistemi-87108",
  storageBucket: "kayitsistemi-87108.appspot.com",
  messagingSenderId: "548998815274",
  appId: "1:548998815274:web:63d26105f0979c86a6ed53",
  measurementId: "G-7K8FFT580D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);