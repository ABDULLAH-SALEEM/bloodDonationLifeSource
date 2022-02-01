import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBuai2DQtU_MLQBhZ8x41dSm4PecxzArow",
  authDomain: "blooddonation-a8b0a.firebaseapp.com",
  projectId: "blooddonation-a8b0a",
  storageBucket: "blooddonation-a8b0a.appspot.com",
  messagingSenderId: "684728720435",
  appId: "1:684728720435:web:b9fe72ec9ffebb67b09746",
  measurementId: "G-755533XCM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);

export {firebaseConfig,auth,db};