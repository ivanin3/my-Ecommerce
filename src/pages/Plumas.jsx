import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Typography, CircularProgress, Grid, Card, CardActionArea, CardContent, CardMedia, Select, MenuItem } from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import { useAuth } from "../context/AuthProvider";

export const Plumas = () => {
  const { useCategory } = useProducts();
  const productos = useCategory("Plumas");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("todos");
  const [isLoading, setIsLoading] = useState(true);

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
      return producto.tipo_pluma === filter;
    }
  });

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "80px",
        minHeight: "calc(100vh - 80px)",
        padding: "20px",
      }}
    >
      <Typography variant="h2" align="center" gutterBottom>
        Plumas
      </Typography>
      {isLoading ? (
        <CircularProgress sx={{ margin: "20px auto", display: "block" }} />
      ) : (
        <>
          <Select value={filter} onChange={handleFilterChange} fullWidth sx={{ marginBottom: 2 }}>
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="Slim">Plumas Slim</MenuItem>
            <MenuItem value="Standard">Plumas Standard</MenuItem>
            <MenuItem value="Oval">Plumas Oval</MenuItem>
          </Select>
          <Grid container spacing={2}>
            {filteredProductos.map((producto) => (
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
            ))}
            {filteredProductos.length === 0 && (
              <Typography variant="body1" align="center" sx={{ width: "100%" }}>
                No hay productos en esta categoría o filtro seleccionado.
              </Typography>
            )}
          </Grid>
        </>
      )}
      <Outlet />
    </Container>
  );
};


