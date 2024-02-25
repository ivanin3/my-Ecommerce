import { Outlet } from "react-router-dom";
import { Container, Typography, Paper } from "@mui/material";

export const Cañas = () => {
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
                    Home Page
                </Typography>
            </Paper>
            <Outlet />
        </Container>
    )
}