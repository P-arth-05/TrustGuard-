// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCCCsPLefsXc9P1tWq0t4k9iwZXcXtfKxo",
  authDomain: "trustguardalgo.firebaseapp.com",
  projectId: "trustguardalgo",
  storageBucket: "trustguardalgo.firebasestorage.app",
  messagingSenderId: "746502696346",
  appId: "1:746502696346:web:04bfdaac8f29d05f7c9e23",
  measurementId: "G-0E70Z1E8LV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export { app };