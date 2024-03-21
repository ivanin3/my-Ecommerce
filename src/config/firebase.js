import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
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

const guardarTransaccionEnFirebase = async (transaccionData) => {
  try {
    const docRef = await addDoc(collection(db, 'transacciones'), transaccionData);
    console.log('Transacción guardada con ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error al guardar la transacción: ', error);
    throw error;
  }
};

const obtenerPedidosDeUsuario = async (userId) => {
  try {
    const q = query(collection(db, 'transacciones'), where('usuario', '==', userId));
    const querySnapshot = await getDocs(q);
    const pedidos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      productos: doc.data().productos,
      precioTotal: doc.data().total,
      metodoPago: doc.data().metodoPago
    }));
    return pedidos;
  } catch (error) {
    console.error('Error al obtener los pedidos del usuario:', error);
    throw error;
  }
};

export {
  db,
  storage,
  auth,
  guardarTransaccionEnFirebase,
  obtenerPedidosDeUsuario
};


