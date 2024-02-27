import React from "react";
import { useNavigate } from "react-router-dom";

export const Carrito = ({ isAuthenticated, carrito }) => {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/iniciar-sesion");
    return null; // Evitar renderizar cualquier contenido si no está autenticado
  }

  return (
    <div>
      <h2>Carrito de compras</h2>
      <ul>
        {carrito.map((producto) => (
          <li key={producto.id}>
            {/* Detalles del producto en el carrito */}
          </li>
        ))}
      </ul>
    </div>
  );
};


