import React from "react";
import { Routes, Route } from "react-router-dom";
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
import { useAuth } from "./context/AuthProvider";
import Detalles from "./pages/Detalles";
import { ResumenCompra } from "./pages/ResumenCompra";
import { PagoTarjeta } from "./pages/PagoTarjeta";
import { MarketProvider } from "./context/MarketProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51OwUK8KPIadgeMjgJkphLRmSCYb75t2z83lV5CpTcfTX3zP3JymhGJcvdwElKTQjrh2OayO6e3bb19ax8B3ZEePU00JAwazYs8");

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  return (
    <MarketProvider>
      <Elements stripe={stripePromise}>
      <Routes>
        <Route
          element={<NavBar isAuthenticated={isAuthenticated} />}
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/iniciar-sesion"
            element={<IniciarSesion setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/dardos" element={<Dardos />} />
          <Route path="/plumas" element={<Plumas />} />
          <Route path="/cañas" element={<Cañas />} />
          <Route path="/puntas" element={<Puntas />} />
          <Route path="/fundas-estuches" element={<Fundas />} />
          <Route path="/accesorios" element={<Accesorios />} />
          <Route path="/dianas" element={<Dianas />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/mi-perfil"
              element={<Perfil isAuthenticated={isAuthenticated} />}
            />
            <Route path="/resumen-compra" element={<ResumenCompra />} />
            <Route path="/detalles/:nombre" element={<Detalles />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/pago-tarjeta" element={<PagoTarjeta />} />
          </Route>
        </Route>
      </Routes>
      </Elements>
    </MarketProvider>
  );
}

export default App;
