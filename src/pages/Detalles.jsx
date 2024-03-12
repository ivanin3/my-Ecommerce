import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { CardMedia, Container, Typography, Button, Rating, Snackbar } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { MarketContext } from "../context/MarketProvider";

export default function Detalles() {
  const { nombre } = useParams();
  const { useProduct } = useProducts();
  const product = useProduct(nombre);

 const { shoppingCart, setShoppingCart } = useContext(MarketContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToCart = () => {
 setShoppingCart([...shoppingCart, product]);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>{product?.nombre}</Typography>
        <CardMedia
          component="img"
          image={product?.imagen}
          alt={product?.nombre}
          sx={{ width: "50%", margin: "0 auto", borderRadius: "10px" }}
        />
        <Typography variant="body1" sx={{ marginTop: "20px", marginBottom: "10px" }}>Descripción: {product?.descripcion}</Typography>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>Precio: {product?.precio} €</Typography>
        <Rating name="rating" value={product?.valoracion} precision={0.5} readOnly sx={{ marginBottom: "20px" }} />
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
          message="Producto añadido al carrito"
        />
      </Container>
    </>
  );
}

