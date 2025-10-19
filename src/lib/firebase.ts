// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuN6juHEvgPnfybXaReHN4iSHJJTuu1WA",
  authDomain: "scem-a64b0.firebaseapp.com",
  projectId: "scem-a64b0",
  storageBucket: "scem-a64b0.firebasestorage.app",
  messagingSenderId: "131958480425",
  appId: "1:131958480425:web:1623e0bcded3d89eaec638",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
