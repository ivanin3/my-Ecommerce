import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MarketContext } from "../context/MarketProvider";
import { AuthContext } from "../context/AuthProvider";

export const ResumenCompra = () => {
  const navigate = useNavigate();
  const { shoppingCart } = useContext(MarketContext);
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: currentUser.email,
    direccion: "",
    codigoPostal: "",
    ciudad: "",
  });
  const [camposIncompletos, setCamposIncompletos] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePago = () => {
    const incompletos = Object.entries(formData).filter(
      ([_, value]) => !value.trim()
    );
    if (incompletos.length > 0) {
      setCamposIncompletos(true);
    } else {

      if (metodoPago === "paypal") {
        navigate("/pago-paypal");
      } else if (metodoPago === "tarjeta") {
        navigate("/pago-tarjeta");
      } else {
        console.log("Por favor, seleccione un método de pago.");
      }
    }
  };

  const handleVolver = () => {
    navigate("/carrito");
  };

  const calcularTotal = () => {
    return shoppingCart
      .reduce((total, item) => total + item.precio, 0)
      .toFixed(2);
  };

  return (
    <Container
      maxWidth="md"
      sx={{ marginTop: "80px", minHeight: "calc(100vh - 80px)" }}
    >
      <Typography variant="h2" gutterBottom>
        Resumen de Compra
      </Typography>
      <Typography variant="h4" gutterBottom>
        Productos en el carrito:
      </Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {shoppingCart.map((product, index) => (
          <ListItem key={index} sx={{ borderBottom: "1px solid #ccc" }}>
            <CardMedia
              component="img"
              image={product.imagen}
              alt={product.nombre}
              sx={{ width: 50, height: 50, marginRight: 2 }}
            />
            <ListItemText
              primary={product.nombre}
              secondary={`${product.precio} €`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" gutterBottom sx={{ marginTop: "20px" }}>
        Total: {calcularTotal()} €
      </Typography>
      <Typography variant="h4" gutterBottom sx={{ marginTop: "20px" }}>
        DIRECCIÓN DE ENTREGA
      </Typography>
      {Object.entries(formData).map(([key, value]) => (
        <TextField
          key={key}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          fullWidth
          sx={{ marginBottom: 2 }}
          name={key}
          value={value}
          onChange={handleInputChange}
          required
          error={camposIncompletos && !value.trim()}
          helperText={
            camposIncompletos && !value.trim() ? "Campo requerido" : ""
          }
        />
      ))}
      <Typography variant="h4" gutterBottom sx={{ marginTop: "20px" }}>
        Método de Pago
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="method"
          name="method"
          value={metodoPago}
          onChange={(event) => setMetodoPago(event.target.value)}
        >
          <Grid container spacing={2}>
            <Grid item>
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label={<img src="/paypal.png" alt="PayPal" width="100" />}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                value="tarjeta"
                control={<Radio />}
                label={
                  <>
                    <img src="/tarjeta-visa.png" alt="Tarjeta" width="60" />
                    <img
                      src="/tarjeta-mastercard.png"
                      alt="Tarjeta"
                      width="60"
                    />
                  </>
                }
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>
      <br />
      <Button
        variant="outlined"
        onClick={handleVolver}
        sx={{ marginTop: "20px", marginRight: "10px" }}
      >
        Volver al Carrito
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePago}
        sx={{ marginTop: "20px" }}
      >
        Ir a Pago
      </Button>
    </Container>
  );
};
