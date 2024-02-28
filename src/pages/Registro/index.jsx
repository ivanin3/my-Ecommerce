import React, { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const authInstance = getAuth();
      await createUserWithEmailAndPassword(authInstance, email, password);
      console.log("Usuario registrado exitosamente.");
      navigate("/iniciar-sesion");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const authInstance = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(authInstance, provider);
      console.log("Usuario registrado con Google.");
      navigate("/iniciar-sesion");
    } catch (error) {
      console.error("Error al registrar el usuario con Google:", error);
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
      <button onClick={handleRegister}>
        Registrarse con correo y contraseña
      </button>
      <button onClick={handleGoogleRegister}>Registrarse con Google</button>
    </div>
  );
};
