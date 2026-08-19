import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBkIMthwFyWaZAFK_K2j_PPuWTfgzffUEY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "advocate-906e7.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "advocate-906e7",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "advocate-906e7.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "524073309346",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:524073309346:web:a285f18c4b084e82cf33fb",
};

// Initialize Firebase only if config is provided and not already initialized
const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

const db = app ? getFirestore(app) : null;

export { app, db };
