import React from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function Registro() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: signupMutation, isLoading, isError } = useMutation({
    mutationKey: "signup",
    mutationFn: async ({ email, password }) => {
      return await createUserWithEmailAndPassword(auth, email, password);
    },
    onSuccess: () => {
      navigate("/iniciar-sesion"); // Redirigir a la página de inicio de sesión después del registro
    },
  });

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/"); // Redirigir a la página principal después del inicio de sesión con Google
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const onSubmit = async (data) => {
    signupMutation(data);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f2f5" // Cambia el color de fondo de la página
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          bgcolor: "#ffffff",
          boxShadow: 24, // Aumenta la elevación del contenedor
          borderRadius: 5,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Registro
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}></form>
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error al registrar usuario. Por favor, inténtalo de nuevo.
          </Alert>
        )}
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          error={!!errors.email}
          helperText={errors.email && "Ingresa un correo electrónico válido"}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Contraseña"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          error={!!errors.password}
          helperText={errors.password && "La contraseña debe tener al menos 6 caracteres"}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          sx={{ mt: 1 }}
        >
          Registrarse
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleGoogleSignup}
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          Iniciar sesión con Google
        </Button>
      </Box>
    </Box>
  );
}








