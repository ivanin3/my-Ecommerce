import { Outlet } from "react-router-dom";
import { Container, Typography, Paper } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

export const Dardos = () => {
  const { useCategory } = useProducts();
  const productos = useCategory("Dardos");
  console.log(productos);
  const { currentUser } = useAuth();
  const navigate = useNavigate();


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
          Dardos
        </Typography>
        {productos.length > 0 ? (
          productos?.map((productos) => (
            <div key={productos.nombre}>
              <Typography variant="h4">{productos.nombre}</Typography>

              <img
                src={productos.imagen}
                alt={productos.nombre}
                onClick={() =>
                  currentUser && navigate(`/detalles/${productos.nombre}`)
                }
              />

              <Typography variant="body1">
                Precio: {productos.precio} €
              </Typography>
              <Typography variant="body1">
                Descripción: {productos.descripcion}
              </Typography>
              <Typography variant="body1">
                Valoración promedio: {productos.valoracion_media}
              </Typography>
            </div>
          ))
        ) : (
          <Typography variant="body1">
            No hay Productos en esta categoría.
          </Typography>
        )}
      </Paper>
      <Outlet />
    </Container>
  );
};
