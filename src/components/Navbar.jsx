import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Outlet, Link } from "react-router-dom";

const pages = [
  { name: "Dardos", link: "/dardos" },
  { name: "Plumas", link: "/plumas" },
  { name: "Cañas", link: "/cañas" },
  { name: "Puntas", link: "/puntas" },
  { name: "Fundas y estuches", link: "/fundas-estuches" },
  { name: "Accesorios", link: "/accesorios" },
  { name: "Dianas", link: "/dianas" },
];
const settings = [
  { name: "Perfil", link: "/mi-perfil" },
  { name: "Mis Pedidos", link: "/mis-pedidos" },
  { name: "Carrito", link: "/carrito" },
  { name: "Cerrar sesión", link: "/iniciar-sesion" },
];

export const NavBar = ({ isAuthenticated }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Implementa la lógica de cierre de sesión aquí si es necesario
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <a href="/">
              <img
                src="target.png"
                alt="logo"
                width="30px"
                height="30px"
                style={{ marginRight: "120px", filter: "invert(1)" }}
              />
            </a>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link to={page.link} style={{ textDecoration: "none" }}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {isAuthenticated ? (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <Button
                      key={page.name}
                      component={Link}
                      to={page.link}
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        textDecoration: "none",
                        fontSize: "12px",
                        marginLeft: 5,
                        marginRight: 5,
                        textTransform: "none",
                      }}
                    >
                      {page.name}
                    </Button>
                  ))}
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting.link} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting.name}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  component={Link}
                  to="/iniciar-sesion"
                  color="inherit"
                  sx={{ textTransform: "none", fontSize: "12px" }}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  component={Link}
                  to="/registro"
                  color="inherit"
                  sx={{ textTransform: "none", fontSize: "12px" }}
                >
                  Registro
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
