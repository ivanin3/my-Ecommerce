import React, { useState, useEffect } from 'react';
import { auth, firestore } from './firebase'; // Importa la instancia de autenticación de Firebase
import { Link } from 'react-router-dom';

export const MiCuenta = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const userRef = firestore.collection('users').doc(userAuth.uid);
          const userSnapshot = await userRef.get();
          if (userSnapshot.exists) {
            setUserData(userSnapshot.data());
          }
        } else {
          setUserData(null);
        }
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);
  
    const handleSignOut = async () => {
      try {
        await auth.signOut();
        // Redirigir al usuario a la página de inicio de sesión u otra página relevante
      } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
      }
    };
  
    if (loading) {
      return <div>Cargando...</div>;
    }
  
    return (
      <div>
        {userData ? (
          <div>
            <h2>¡Bienvenido de nuevo, {userData.displayName || userData.email}!</h2>
            <p>Correo electrónico: {userData.email}</p>
            {userData.displayName && <p>Nombre: {userData.displayName}</p>}
            <Link to="/editar-perfil">Editar Perfil</Link>
            <button onClick={handleSignOut}>Cerrar Sesión</button>
          </div>
        ) : (
          <div>
            <h2>No has iniciado sesión.</h2>
            <Link to="/iniciar-sesion">Iniciar Sesión</Link>
            <Link to="/registro">Registrarse</Link>
          </div>
        )}
      </div>
    );
  }
    