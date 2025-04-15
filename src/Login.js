import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Link,
} from "@mui/material";
import { motion } from "framer-motion"; 

function Login({ setCurrentUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
  
    if (!username || !password) {
      setError("All fields are required.");
      return;
    }
  
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
  
    setError("");
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        username,
        password,
      });
  
      if (response.data.user) {
        const userData = response.data.user; 
        localStorage.setItem("currentUser", JSON.stringify(userData)); 
        setCurrentUser(userData); 
  
        console.log("Login successful:", userData);
        navigate("/Home");
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  
    setLoading(false);
  };
  

  return (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          padding: 4,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Sign In
        </Typography>

        <Typography component="p" variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          Please fill in your credentials to sign in.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }} noValidate>
          <Box sx={{ mb: 2 }}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              shrink            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              shrink            />
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              backgroundColor: "#1976d2",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#115293" },
            }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Link href="/forgotpassword" variant="body2" sx={{ textDecoration: "none", color: "#1976d2" }}>
              Forgot Password?
            </Link>
            <Link href="/" variant="body2" sx={{ textDecoration: "none", color: "#1976d2" }}>
              Don't have an account? Sign up
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
    </motion.div>
  );
}

export default Login;