import React from "react";
import { useAuth } from "../../context/AuthProvider";
import { Container, Typography } from "@mui/material";

export const Perfil = () => {
  const { currentUser } = useAuth();

  return (
    <Container maxWidth="md" sx={{ marginTop: "80px", minHeight: "calc(100vh - 80px)", textAlign: "center" }}>
      <Typography variant="h2" gutterBottom>Mi Perfil</Typography>
      {currentUser ? (
        <div>
          <Typography variant="h4" gutterBottom>Usuario: {currentUser.email}</Typography>
        </div>
      ) : (
        <Typography variant="body1" gutterBottom>No hay usuario autenticado</Typography>
      )}
    </Container>
  );
};



