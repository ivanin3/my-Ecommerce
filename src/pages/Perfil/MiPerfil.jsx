import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const Perfil = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        setUserData({ displayName, email, photoURL });
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Perfil</h1>
      {userData ? (
        <div>
          <p>Nombre de usuario: {userData.displayName}</p>
          <p>Email: {userData.email}</p>
          {userData.photoURL && (
            <img src={userData.photoURL} alt="Foto de perfil" />
          )}
        </div>
      ) : (
        <p>Cargando datos de usuario...</p>
      )}
      <Link to="/">Inicio</Link>
    </div>
  );
};
