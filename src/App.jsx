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
import { MiCuenta } from "./pages/MiCuenta";
import { Carrito } from "./pages/Carrito";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dardos" element={<Dardos />} />
        <Route path="/plumas" element={<Plumas />} />
        <Route path="/cañas" element={<Cañas />} />
        <Route path="/puntas" element={<Puntas />} />
        <Route path="/fundas-y-estuches" element={<Fundas />} />
        <Route path="/accesorios" element={<Accesorios />} />
        <Route path="/dianas" element={<Dianas />} />
        <Route path="/mi-cuenta" element={<MiCuenta />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </div>
  );
}

export default App;