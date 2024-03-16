import React, { useState } from "react";
import { Box, Button, Typography, TextField, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../config/firebase";

export default function IniciarSesion({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: loginMutate, isLoading, isError } = useMutation({
    mutationKey: "login",
    mutationFn: async ({ email, password }) => {
      await signInWithEmailAndPassword(auth, email, password);
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", true);
      navigate("/");
    },
    onError: (error) => {
      console.error("Error al loguear el usuario:", error);
    },
  });

  const onSubmit = (data) => {
    loginMutate(data);
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error("Error al loguear con Google:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f2f5"
    >
<Box
  component="form"
  onSubmit={handleSubmit(onSubmit)}
  sx={{
    width: "100%",
    maxWidth: 400,
    p: 4,
    bgcolor: "#ffffff",
    boxShadow: 24,
    borderRadius: 5,
  }}
>
  <Typography variant="h5" gutterBottom align="center">
    Iniciar Sesión
  </Typography>
  <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
    {isError && (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error al iniciar sesión. Por favor, inténtalo de nuevo.
      </Alert>
    )}
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        fullWidth
        margin="none" // Modificamos margin a 'none' para eliminar el espacio adicional
        label="Email"
        type="email"
        {...register("email", { required: true })}
        error={!!errors.email}
        helperText={errors.email && "Este campo es obligatorio"}
      />
      <TextField
        fullWidth
        margin="none" // Modificamos margin a 'none' para eliminar el espacio adicional
        label="Contraseña"
        type="password"
        {...register("password", { required: true })}
        error={!!errors.password}
        helperText={errors.password && "Este campo es obligatorio"}
      />
      <Button
        variant="contained"
        type="submit"
        disabled={isLoading}
        fullWidth
      >
        Iniciar Sesión
      </Button>
    </Box>
  </form>
  <Box marginTop={2}>
    <Button
      variant="outlined"
      onClick={googleLogin}
      disabled={isLoading}
      fullWidth
    >
      Iniciar sesión con Google
    </Button>
  </Box>
</Box>
</Box>
  );
    }
