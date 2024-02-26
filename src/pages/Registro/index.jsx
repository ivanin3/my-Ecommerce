import React, { useState } from "react";
import { auth } from "../../config/firebase";

export const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log("Usuario registrado:", userCredential.user);
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await auth.signInWithPopup(provider);
      console.log("Usuario registrado con Google:", userCredential.user);
    } catch (error) {
      console.error("Error al registrar el usuario con Google:", error);
    }
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrarse con correo y contraseña</button>
      <button onClick={handleGoogleRegister}>Registrarse con Google</button>
    </div>
  );
};