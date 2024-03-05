import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function Registro() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: signupMutation } = useMutation({
    mutationKey: "signup",
    mutationFn: async ({ email, password }) => {
      return await createUserWithEmailAndPassword(auth, email, password);
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("Error al registrar usuario:", error);
    },
  });

  const onSubmit = async (data) => {
    signupMutation(data);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,
          bgcolor: "background.paper",
          boxShadow: 2,
          borderRadius: 1,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Registro
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          {...register("email", { required: true })}
          error={!!errors.email}
          helperText={errors.email && "This field is required"}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          {...register("password", { required: true })}
          error={!!errors.password}
          helperText={errors.password && "This field is required"}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={signupMutation.isLoading}
          sx={{ mt: 2 }}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
}
