import React from "react";
import { Container, Typography, CircularProgress } from "@mui/material";

export const Accesorios = () => {
  return (
    <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center" }}>
      <img src="/public/construccion.png" alt="Logo" width="150" height="150" style={{ marginBottom: "20px" }} />
      <Typography variant="h4" gutterBottom style={{ marginBottom: "10px" }}>
        Sitio en Construcción
      </Typography>
      <Typography variant="body1" gutterBottom style={{ marginBottom: "20px" }}>
        Estamos trabajando en mejorar tu experiencia. ¡Vuelve pronto!
      </Typography>
      <CircularProgress style={{ marginBottom: "20px" }} />
      <Typography variant="caption" gutterBottom>
        Cargando...
      </Typography>
    </Container>
  );
};