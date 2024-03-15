import { useState, useEffect } from "react";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../config/firebase";

// Obtener productos de una categoría específica
export const useProducts = () => {
  const useCategory = (category) => {
    const [productos, setProductos] = useState([]);
    
    // Cargar productos cuando la categoría cambia
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

  // Obtener un producto por su nombre
  const useProduct = (nombre) => {
    const [producto, setProducto] = useState(null);
    
    // Cargar producto cuando el nombre cambia
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

  // Obtener una lista de todos los productos
  const useProductsList = () => {
    const [productos, setProductos] = useState([]);
    
    // Cargar lista de productos cuando el componente se monta o cuando cambia la categoría seleccionada.
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

