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
import ChatIcon from "@mui/icons-material/Chat";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptIcon from "@mui/icons-material/Receipt"; 
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; 
import CalculateIcon from "@mui/icons-material/Calculate";  
import GroupsIcon from "@mui/icons-material/Groups";        
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [splitMenuAnchor, setSplitMenuAnchor] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSplitMenuOpen = (event) => {
    setSplitMenuAnchor(event.currentTarget);
  };

  const handleSplitMenuClose = () => {
    setSplitMenuAnchor(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #1976d2 0%, #21cbf3 100%)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          component={Link}
          to="/home"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            fontFamily: "'Pacifico', cursive",
            letterSpacing: "1px",
            "&:hover": { color: "#ffcc00", transform: "scale(1.05)", transition: "0.3s" },
          }}
        >
          Budget<span style={{ color: "#ffcc00" }}>Buddy</span>
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button component={Link} to="/Home" startIcon={<HomeIcon />} color="inherit"
            sx={{
              color: "white",
              textTransform: "capitalize",
              fontWeight: 500,
              "&:hover": { color: "#ffcc00", transform: "scale(1.1)", transition: "0.3s" },
            }}
          >
            Home
          </Button>

          <Button component={Link} to="/Expenses" startIcon={<SavingsIcon />} color="inherit"
            sx={{
              color: "white",
              textTransform: "capitalize",
              fontWeight: 500,
              "&:hover": { color: "#ffcc00", transform: "scale(1.1)", transition: "0.3s" },
            }}
          >
            Expenses
          </Button>

          <Button
            color="inherit"
            startIcon={<ReceiptIcon />}
            endIcon={<ArrowDropDownIcon />}
            onClick={handleSplitMenuOpen}
            sx={{
              color: "white",
              textTransform: "capitalize",
              fontWeight: 500,
              "&:hover": {
                color: "#ffcc00",
                transform: "scale(1.1)",
                transition: "all 0.3s ease-in-out",
              },
            }}
          >
            Split Expenses
          </Button>
          <Menu
            anchorEl={splitMenuAnchor}
            open={Boolean(splitMenuAnchor)}
            onClose={handleSplitMenuClose}
          >
            <MenuItem component={Link} to="/manualsplit" onClick={handleSplitMenuClose}>
              <CalculateIcon sx={{ mr: 1, color: "#1976d2" }} /> Manual Split
            </MenuItem>
            <MenuItem component={Link} to="/billsplit" onClick={handleSplitMenuClose}>
              <GroupsIcon sx={{ mr: 1, color: "#1976d2" }} /> Bill Receipt Split
            </MenuItem>
          </Menu>

          <Button component={Link} to="/chatbot" startIcon={<ChatIcon />} color="inherit"
            sx={{
              color: "white",
              textTransform: "capitalize",
              fontWeight: 500,
              "&:hover": { color: "#ffcc00", transform: "scale(1.1)", transition: "0.3s" },
            }}
          >
            Chatbot
          </Button>

          <Button component={Link} to="/aboutus" startIcon={<InfoIcon />} color="inherit"
            sx={{
              color: "white",
              textTransform: "capitalize",
              fontWeight: 500,
              "&:hover": { color: "#ffcc00", transform: "scale(1.1)", transition: "0.3s" },
            }}
          >
            About Us
          </Button>

          <Button component={Link} to="/" startIcon={<LogoutIcon />} color="inherit"
            sx={{
              color: "white",
              textTransform: "capitalize",
              fontWeight: 500,
              "&:hover": { color: "#ffcc00", transform: "scale(1.1)", transition: "0.3s" },
            }}
          >
            Logout
          </Button>
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" edge="end" color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem component={Link} to="/Home" onClick={handleMenuClose}>
              <HomeIcon sx={{ mr: 1 }} /> Home
            </MenuItem>
            <MenuItem component={Link} to="/Expenses" onClick={handleMenuClose}>
              <SavingsIcon sx={{ mr: 1 }} /> Expenses
            </MenuItem>
            <MenuItem onClick={handleSplitMenuOpen}>
              <ReceiptIcon sx={{ mr: 1 }} /> Split Expenses <ArrowDropDownIcon sx={{ ml: 1 }} />
            </MenuItem>
            <MenuItem component={Link} to="/manualsplit" onClick={handleMenuClose}>
              <CalculateIcon sx={{ mr: 1 }} /> Manual Split
            </MenuItem>
            <MenuItem component={Link} to="/billsplit" onClick={handleMenuClose}>
              <GroupsIcon sx={{ mr: 1 }} /> Bill Receipt Split
            </MenuItem>
            <MenuItem component={Link} to="/chatbot" onClick={handleMenuClose}>
              <ChatIcon sx={{ mr: 1 }} /> Chatbot
            </MenuItem>
            <MenuItem component={Link} to="/aboutus" onClick={handleMenuClose}>
              <InfoIcon sx={{ mr: 1 }} /> About Us
            </MenuItem>
            <MenuItem component={Link} to="/" onClick={handleMenuClose}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
