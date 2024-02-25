import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADFTkBaynamYNj5LeXNYR5cNO16LWdx8I",
  authDomain: "my-ecommerce-bd703.firebaseapp.com",
  projectId: "my-ecommerce-bd703",
  storageBucket: "my-ecommerce-bd703.appspot.com",
  messagingSenderId: "639022023322",
  appId: "1:639022023322:web:d8e06e0a5153861c4ed523"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };