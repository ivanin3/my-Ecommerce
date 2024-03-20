import React from "react";
import { useAuth } from "../../context/AuthProvider";
import { Container, Typography, Box, Avatar, Divider } from "@mui/material";

export const Perfil = () => {
  const { currentUser } = useAuth();

  return (
    <Container maxWidth="sm" sx={{ marginTop: "80px", textAlign: "center" }}>
      <Box sx={{ mb: 4 }}>
          <Avatar alt="Avatar" src={currentUser.photoURL} sx={{ width: 120, height: 120, mx: "auto" }} />
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







