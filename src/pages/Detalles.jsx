import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";

export default function Detalles() {
  const { nombre } = useParams();
  const { useProduct } = useProducts();
  const product = useProduct(nombre);

  return (
    <>
    <Container
    maxWidth="md"
    sx={{
      marginTop: "80px",
      textAlign: "center",
      backgroundColor: "#E3F2FD",
      minHeight: "calc(100vh - 80px)",
      padding: "20px",
    }}
  >
    Detalles
    <Typography variant="h4">{product?.nombre}</Typography>
  </Container>
  </>
  )
}
