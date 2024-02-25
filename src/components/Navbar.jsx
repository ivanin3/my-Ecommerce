import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

export const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
            <a href="/">
              <img src="target.png" alt="" width={"40px"} height={"40px"}/>
            </a>
          <Button component={Link} to="/dardos" color="inherit">
            Dardos
          </Button>
          <Button component={Link} to="/plumas" color="inherit">
            Plumas
          </Button>
          <Button component={Link} to="/cañas" color="inherit">
            Cañas
          </Button>
          <Button component={Link} to="/puntas" color="inherit">
            Puntas
          </Button>
          <Button component={Link} to="/fundas-y-estuches" color="inherit">
            Fundas y estuches
          </Button>
          <Button component={Link} to="/accesorios" color="inherit">
            Accesorios
          </Button>
          <Button component={Link} to="/dianas" color="inherit">
            Dianas
            </Button>
            <Button component={Link} to="/mi-cuenta" color="inherit">
              <img src="mi-cuenta.png" alt="" width={"40px"} height={"40px"}/>
              Mi cuenta
            </Button>
          <Button component={Link} to="/carrito" color="inherit">
            <img src="54524.png" alt="" width={"40px"} height={"40px"} />
          Carrito
        </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
