import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Container, Paper, Typography } from "@mui/material";

export const Carrito = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { shoppingCart, setShoppingCart } = useContext(MarketProvider)
  

  if (!currentUser) {
    navigate("/iniciar-sesion");
    return null;
  }

    return (
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
          <Paper elevation={20} sx={{ p: 2 }}>
              <Typography variant="h2" gutterBottom>
                  Carrito
              </Typography>
              <p>{shoppingCart.toString()}</p>
          </Paper>
          <Outlet />
      </Container>
  )
};
