import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
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

  const { mutate: loginMutate, isLoading } = useMutation({
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
    >
      <Box width="300px">
        <Typography variant="h5" gutterBottom align="center">
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <label htmlFor="email">
              Email
              <input
                type="email"
                autoComplete="username"
                className="input"
                {...register("email", { required: true })}
              />
              {errors.email && <span>This field is required</span>}
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                className="input"
                autoComplete="current-password"
                {...register("password", { required: true })}
              />
              {errors.password && <span>This field is required</span>}
            </label>
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
