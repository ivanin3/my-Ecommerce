import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Container } from "@mui/material";

export const PagoPaypal = () => {
  return (
    <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }} maxWidth="sm">
      <Typography variant="h4" gutterBottom style={{ color: "red" }}>
        Error 404: Página no encontrada
      </Typography>
      <Typography variant="body1" style={{ marginBottom: "16px" }}>
        Lo sentimos, la página que estás buscando no pudo ser encontrada.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Volver a la página de inicio
      </Button>
    </Container>
  );
};


