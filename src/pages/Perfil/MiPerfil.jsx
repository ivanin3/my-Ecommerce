import React from "react";
import { Navigate } from "react-router-dom";

export const Perfil = ({ isAuthenticated, userData }) => {
  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" />;
  }

  return (
    <div>
      <h2>Perfil de usuario</h2>
      <p>Nombre: {userData.nombre}</p>
      <p>Correo electrónico: {userData.correo}</p>
    </div>
  );
};



