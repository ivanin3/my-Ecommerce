import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { NavBar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { Dardos } from "./pages/Dardos";
import { Plumas } from "./pages/Plumas";
import { Cañas } from "./pages/Cañas";
import { Puntas } from "./pages/Puntas";
import { Fundas } from "./pages/Fundas";
import { Accesorios } from "./pages/Accesorios";
import { Dianas } from "./pages/Dianas";
import Registro from "./pages/Registro";
import IniciarSesion from "./pages/Iniciar-sesion";
import { Perfil } from "./pages/Perfil/MiPerfil";
import { Carrito } from "./pages/Perfil/Carrito";
import { MisPedidos } from "./pages/Perfil/MisPedidos";
import { useAuth } from "./context/AuthProvider";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  return (
    <Routes>
      <Route element={<NavBar isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dardos" element={<Dardos />} />
        <Route path="/plumas" element={<Plumas />} />
        <Route path="/cañas" element={<Cañas />} />
        <Route path="/puntas" element={<Puntas />} />
        <Route path="/fundas-estuches" element={<Fundas />} />
        <Route path="/accesorios" element={<Accesorios />} />
        <Route path="/dianas" element={<Dianas />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/iniciar-sesion"
          element={<IniciarSesion setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/mi-perfil"
          element={<Perfil isAuthenticated={isAuthenticated} />}
        />
        <Route path="/mis-pedidos" element={<MisPedidos />} />
      </Route>
    </Routes>
  );
}

export default App;
