import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const IniciarSesion = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const authInstance = getAuth();
      await signInWithEmailAndPassword(authInstance, email, password);
      console.log("Inicio de sesión exitoso.");
      setIsAuthenticated(true); 
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const authInstance = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(authInstance, provider);
      console.log("Inicio de sesión con Google exitoso.");
      setIsAuthenticated(true);
      navigate("/"); 
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>
        Iniciar sesión con correo y contraseña
      </button>
      <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
    </div>
  );
};


