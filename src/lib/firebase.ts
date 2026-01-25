// // lib/firebase.ts
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDuN6juHEvgPnfybXaReHN4iSHJJTuu1WA",
//   authDomain: "scem-a64b0.firebaseapp.com",
//   projectId: "scem-a64b0",
//   storageBucket: "scem-a64b0.firebasestorage.app",
//   messagingSenderId: "131958480425",
//   appId: "1:131958480425:web:1623e0bcded3d89eaec638",
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// Updated for deployment with environment variables
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDuN6juHEvgPnfybXaReHN4iSHJJTuu1WA",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "scem-a64b0.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "scem-a64b0",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "scem-a64b0.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "131958480425",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:131958480425:web:1623e0bcded3d89eaec638",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
