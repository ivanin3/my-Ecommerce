import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "my-ecommerce-bd703.firebaseapp.com",
  projectId: "my-ecommerce-bd703",
  storageBucket: "my-ecommerce-bd703.appspot.com",
  messagingSenderId: "639022023322",
  appId: "1:639022023322:web:d8e06e0a5153861c4ed523"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {
  db,
  storage,
  auth,
}