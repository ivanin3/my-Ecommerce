import React from "react";
import { useNavigate } from "react-router-dom";

export const MisPedidos = () => {
  const navigate = useNavigate();

  
  const isAuthenticated = true; 

  
  if (!isAuthenticated) {
    navigate("/iniciar-sesion");
    return null; 
  }

  return (
    <div>
      <h2>Mis Pedidos</h2>
    </div>
  );
};





