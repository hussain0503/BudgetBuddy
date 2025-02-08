import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SavingsIcon from "@mui/icons-material/Savings";
import ChatIcon from "@mui/icons-material/Chat"; // Updated icon
import InfoIcon from "@mui/icons-material/Info"; 
import LogoutIcon from "@mui/icons-material/Logout"; 
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navLinks = [
    { label: "Home", path: "/Home", icon: <HomeIcon /> },
    { label: "Expenses", path: "/Expenses", icon: <SavingsIcon /> },
    { label: "Chatbot", path: "/reports", icon: <ChatIcon /> }, 
    { label: "About Us", path: "/aboutus", icon: <InfoIcon /> },
    { label: "Logout", path: "/", icon: <LogoutIcon /> }, 
  ];

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #1976d2 0%, #21cbf3 100%)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar>
        {/* Branding - Improved Typography */}
        <Typography
          variant="h4"
          component={Link}
          to="/home"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            fontFamily: "'Pacifico', cursive", // More stylish font
            letterSpacing: "1px",
            "&:hover": { color: "#ffcc00", transform: "scale(1.05)", transition: "0.3s" },
          }}
        >
          Budget<span style={{ color: "#ffcc00" }}>Buddy</span> {/* Color contrast */}
        </Typography>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
          }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.label}
              component={Link}
              to={link.path}
              startIcon={link.icon}
              color="inherit"
              sx={{
                color: "white",
                textTransform: "capitalize",
                fontWeight: 500,
                fontFamily: "'Roboto', sans-serif",
                "&:hover": {
                  color: "#ffcc00",
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {navLinks.map((link) => (
              <MenuItem
                key={link.label}
                component={Link}
                to={link.path}
                onClick={handleMenuClose}
              >
                {link.icon}
                <Typography sx={{ ml: 1 }}>{link.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
