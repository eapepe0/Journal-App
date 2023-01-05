// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBcmVKstrYpN9ecfm1WJn-uKN08inRW5W0",

  authDomain: "reactcursos-c1214.firebaseapp.com",

  projectId: "reactcursos-c1214",

  storageBucket: "reactcursos-c1214.appspot.com",

  messagingSenderId: "200136261155",

  appId: "1:200136261155:web:b3dda870016ac3cf5efb96",
};

// Initialize Firebase

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp); // autenticacion
export const FirebaseDB = getFirestore(FirebaseApp); // base de datos
