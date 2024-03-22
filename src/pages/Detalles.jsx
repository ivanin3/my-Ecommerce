import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Button, Rating, Snackbar, CardMedia, Alert } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { MarketContext } from "../context/MarketProvider";
import { useProducts } from "../hooks/useProducts";

export default function Detalles() {
  const { nombre } = useParams();
  const { useProduct } = useProducts();
  const product = useProduct(nombre);

  const { shoppingCart, setShoppingCart } = useContext(MarketContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToCart = () => {
    setShoppingCart([...shoppingCart, product]);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: "80px", textAlign: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>{product?.nombre}</Typography>
        <CardMedia
          component="img"
          image={product?.imagen}
          alt={product?.nombre}
          sx={{ width: "50%", margin: "0 auto", borderRadius: "10px" }}
        />
        <Typography variant="body1" sx={{ marginTop: "20px", marginBottom: "10px" }}>Descripción: {product?.descripcion}</Typography>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>Precio: {product?.precio} €</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
          sx={{ marginRight: "10px" }}
        >
          Añadir al carrito
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
    onClose={handleCloseSnackbar}
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
  >
    Producto añadido al carrito
  </Alert>
  </Snackbar>
      </Container>
    </>
  );
}

