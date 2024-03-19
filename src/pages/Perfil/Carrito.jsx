import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CardMedia, Button, Snackbar } from "@mui/material";
import { MarketContext } from "../../context/MarketProvider";

export const Carrito = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { shoppingCart, setShoppingCart } = useContext(MarketContext);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  // Eliminar producto del carrito
  const handleRemoveFromCart = (index) => {
    const newCart = [...shoppingCart];
    newCart.splice(index, 1);
    setShoppingCart(newCart);
    setSnackbarMessage("Producto eliminado del carrito");
    setSnackbarOpen(true);
  };

  // Vaciar el carrito
  const handleVaciarCarrito = () => {
    setShoppingCart([]);
    setSnackbarMessage("Carrito vaciado");
    setSnackbarOpen(true);
  };


  // Realizar la compra y vaciar el carrito
  const handleCompra = () => {
    navigate("/resumen-compra");
  };

  // Calcular el total de la compra
  const calcularTotal = () => {
    return shoppingCart.reduce((total, item) => total + item.precio, 0).toFixed(2);
  };

  if (!currentUser) {
    navigate("/iniciar-sesion");
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: "80px", minHeight: "calc(100vh - 80px)" }}>
      <Paper elevation={20} sx={{ p: 2 }}>
        <Typography variant="h2" gutterBottom>
          Carrito
        </Typography>
        {shoppingCart.length === 0 ? (
          <Typography variant="body1">Tu carrito está vacío.</Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shoppingCart.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CardMedia
                            component="img"
                            image={item.imagen}
                            alt={item.nombre}
                            sx={{ width: 50, height: 50, marginRight: 10 }}
                          />
                          <Typography>{item.nombre}</Typography>
                        </div>
                      </TableCell>
                      <TableCell>{item.precio} €</TableCell>
                      <TableCell>
                        <Button variant="outlined" color="error" onClick={() => handleRemoveFromCart(index)}>
                          Quitar del carrito
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Total: {calcularTotal()} €
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCompra} sx={{ marginTop: 2 }}>
              Comprar
            </Button>
            <Button variant="outlined" color="error" onClick={handleVaciarCarrito} sx={{ marginTop: 2, marginLeft: 2 }}>
              Vaciar Carrito
            </Button>
          </>
        )}
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        key={'top' + 'right'}
      />
      <Outlet />
    </Container>
  );
};





