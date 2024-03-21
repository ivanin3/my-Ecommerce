import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Container, Typography, Box, Avatar, Divider, List, ListItem, ListItemText, CardMedia, Paper } from "@mui/material";
import { obtenerPedidosDeUsuario } from "../../config/firebase";

export const Perfil = () => {
  const { currentUser } = useAuth();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        if (currentUser) {
          const pedidosUsuario = await obtenerPedidosDeUsuario(currentUser.uid);
          setPedidos(pedidosUsuario);
        }
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    };

    fetchPedidos();
  }, [currentUser]);

  return (
    <Container maxWidth="md" sx={{ marginTop: "80px", minHeight: "calc(100vh - 80px)" }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Avatar alt="Avatar" src={currentUser.photoURL} sx={{ width: 120, height: 120, mx: "auto" }} />
        <Typography variant="h4" gutterBottom mt={2}>
          {currentUser ? currentUser.email : "Usuario no autenticado"}
        </Typography>
      </Box>
      <Divider sx={{ mb: 4 }} />
      <Box>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center"}}>
          Información de la cuenta
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ textAlign: "center"}}>
          Nombre: {currentUser ? currentUser.displayName || "No proporcionado" : "No disponible"}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ textAlign: "center"}}>
          Email: {currentUser ? currentUser.email : "No disponible"}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        <br />
        <Divider sx={{ mb: 4 }} />
          Pedidos Realizados
        </Typography>
        <List sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {pedidos.length > 0 ? (
            pedidos.map((pedido, index) => (
              <Paper key={index} elevation={3} sx={{ width: "100%", marginBottom: 2, padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Pedido {index + 1}
                </Typography>
                <List>
                  {pedido.productos.map((producto, prodIndex) => (
                    <ListItem key={prodIndex} sx={{ alignItems: "flex-start" }}>
                      <CardMedia
                        component="img"
                        image={producto.imagen}
                        alt={producto.nombre}
                        sx={{ width: 80, height: 80, marginRight: 2 }}
                      />
                      <ListItemText
                        primary={producto.nombre}
                        secondary={`Precio: ${producto.precio} €`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                  Total: {pedido.precioTotal} €
                </Typography>
                <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                  Método de Pago: {pedido.metodoPago}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center" }}>No hay pedidos realizados.</Typography>
          )}
        </List>
      </Box>
    </Container>
  );
};










