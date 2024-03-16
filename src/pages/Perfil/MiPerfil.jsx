import React from "react";
import { useAuth } from "../../context/AuthProvider";
import { Container, Typography, Box, Avatar, Divider } from "@mui/material";

export const Perfil = () => {
  const { currentUser } = useAuth();

  // Función para obtener las iniciales del correo electrónico
  const getEmailInitials = (email) => {
    const [username] = email.split("@");
    return username.charAt(0).toUpperCase();
  };

  // Función para determinar si el usuario se ha autenticado con Google
  const isGoogleSignIn = () => {
    return currentUser && currentUser.providerData && currentUser.providerData[0]?.providerId === "google.com";
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "80px", textAlign: "center" }}>
      <Box sx={{ mb: 4 }}>
        {/* Mostrar el avatar de Google si el usuario se autenticó con Google */}
        {isGoogleSignIn() ? (
          <Avatar alt="Avatar" src={currentUser.photoURL} sx={{ width: 120, height: 120, mx: "auto" }} />
        ) : (
          /* Mostrar las iniciales del correo electrónico si el usuario se autenticó con correo y contraseña */
          <Avatar alt="Avatar" sx={{ width: 120, height: 120, mx: "auto", bgcolor: "#1976d2" }}>
            {currentUser ? getEmailInitials(currentUser.email) : ""}
          </Avatar>
        )}
        <Typography variant="h4" gutterBottom mt={2}>
          {currentUser ? currentUser.email : "Usuario no autenticado"}
        </Typography>
      </Box>
      <Divider sx={{ mb: 4 }} />
      <Box>
        <Typography variant="h6" gutterBottom>
          Información de la cuenta
        </Typography>
        <Typography variant="body1" gutterBottom>
          Nombre: {currentUser ? currentUser.displayName || "No proporcionado" : "No disponible"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {currentUser ? currentUser.email : "No disponible"}
        </Typography>
      </Box>
    </Container>
  );
};







