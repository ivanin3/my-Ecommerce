import React from "react";
import { Redirect } from "react-router-dom";

export const CerrarSesion = ({ isAuthenticated, handleLogout }) => {
  if (!isAuthenticated) {
    return <Redirect to="/iniciar-sesion" />;
  }

  return (
    <div>
      <h2>Cerrar sesión</h2>
      <p>¿Estás seguro de que quieres cerrar sesión?</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

