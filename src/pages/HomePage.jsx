import { Outlet, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import { useAuth } from "../context/AuthProvider";

export const HomePage = () => {
  const { useProductsList } = useProducts();
  const productos = useProductsList();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const random = () => {
    const randomProductos = [];
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * productos.length);
      randomProductos.push(productos[randomIndex]);
    }
    const randomSet = new Set(randomProductos);
    const myRandom = [...randomSet.values()];
    return myRandom;
  };

  const randomProducts = random();

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
        Home Page
      </Typography>
      <Grid container spacing={2}>
        {randomProducts.map((producto) => (
          <Grid key={producto?.nombre} item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={producto?.imagen}
                  alt={producto?.nombre}
                  onClick={() => currentUser && navigate(`/detalles/${producto.nombre}`)}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {producto?.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: {producto?.precio} €
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {randomProducts.length === 0 && (
          <Typography variant="body1" align="center" sx={{ width: "100%" }}>
            No hay productos disponibles.
          </Typography>
        )}
      </Grid>
      <Outlet />
    </Container>
  );
};

