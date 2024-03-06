import { useState, useEffect } from "react";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../config/firebase";

export const useProducts = () => {
  const useCategory = (category) => {
    const [productos, setProductos] = useState([]);
    
    useEffect(() => {
      const fetchProductos = async () => {
        const q = query(
          collection(db, "Productos"),
          where("categoria", "==", category)
        );
        const querySnapshot = await getDocs(q);
        const ProductosData = querySnapshot.docs.map((doc) => doc.data());
        setProductos(ProductosData);
      };

      fetchProductos();
    }, [category]); 
    
    return productos;
  };

  const useProduct = (nombre) => {
    const [producto, setProducto] = useState(null);
    
    useEffect(() => {
      const fetchProducto = async () => {
        const q = query(
          collection(db, "Productos"),
          where("nombre", "==", nombre)
        );
        const querySnapshot = await getDocs(q);
        const ProductosData = querySnapshot.docs.map((doc) => doc.data());
        setProducto(ProductosData[0]);
      };

      fetchProducto();
    }, [nombre]); 

    return producto;
  };

  const useProductsList = () => {
    const [productos, setProductos] = useState([]);
    
    useEffect(() => {
      const fetchProductos = async () => {
        const q = query(collection(db, "Productos"));
        const querySnapshot = await getDocs(q);
        const ProductosData = querySnapshot.docs.map((doc) => doc.data());
        setProductos(ProductosData);
      };

      fetchProductos();
    }, []); 

    return productos;
  };

  return { useCategory, useProduct, useProductsList };
};

