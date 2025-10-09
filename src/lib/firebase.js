// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCF8XGjyQiFNbZ-7LOKA-dzVPETqhHpNjI",
  authDomain: "snus-d303a.firebaseapp.com",
  projectId: "snus-d303a",
  storageBucket: "snus-d303a.firebasestorage.app",
  messagingSenderId: "376081911357",
  appId: "1:376081911357:web:ebadbdf94cebafae862454"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

