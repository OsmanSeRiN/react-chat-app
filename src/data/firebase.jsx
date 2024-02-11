import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRfafvfcZUHkWejyI1N2pxi5QcZS6nRMc",
  authDomain: "tomato-chat.firebaseapp.com",
  projectId: "tomato-chat",
  storageBucket: "tomato-chat.appspot.com",
  messagingSenderId: "388376283629",
  appId: "1:388376283629:web:603931fd51e77b7b5b3fe4",
  measurementId: "G-1RDY0SDLL3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
