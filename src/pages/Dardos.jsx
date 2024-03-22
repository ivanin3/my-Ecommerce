import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container, Typography, Select, MenuItem, Grid, Card, CardActionArea, CardContent, CardMedia, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

export const Dardos = () => {
  const { useCategory } = useProducts();
  const productos = useCategory("Dardos");
  const [isLoading, setIsLoading] = useState(true); 
  const [filter, setFilter] = useState("todos");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredProductos = productos.filter((producto) => {
    if (filter === "todos") {
      return true;
    } else {
      return producto.tipo_punta === filter;
    }
  });

  return (
    <Container maxWidth="md" sx={{ marginTop: "80px", minHeight: "calc(100vh - 80px)" }}>
      <Typography variant="h2" align="center" gutterBottom>Dardos</Typography>
      {isLoading ? ( 
        <Grid container justifyContent="center">
          <CircularProgress sx={{ margin: "20px auto" }} />
        </Grid>
      ) : (
        <>
          <Select value={filter} onChange={handleFilterChange} fullWidth sx={{ marginBottom: 2 }}>
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="Acero">Dardos de acero</MenuItem>
            <MenuItem value="Plástico">Dardos de plástico</MenuItem>
          </Select>
          <Grid container spacing={2}>
            {filteredProductos.length === 0 ? (
              <Typography variant="body1" align="center" sx={{ width: "100%" }}>
                No hay productos en esta categoría o filtro seleccionado.
              </Typography>
            ) : (
              filteredProductos.map((producto) => (
                <Grid key={producto.nombre} item xs={12} sm={6} md={4}>
                  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="300"
                        image={producto.imagen}
                        alt={producto.nombre}
                        onClick={() => currentUser && navigate(`/detalles/${producto.nombre}`)}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {producto.nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Precio: {producto.precio} €
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </>
      )}
      <Outlet />
    </Container>
  );
};




