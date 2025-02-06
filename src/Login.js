import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Grid,
  Link,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Initialize navigate

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
  
    console.log("Sending login request:", { username, password });
  
    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        username,
        password,
      });
  
      console.log("Login successful", response.data);
      
      // Redirect to home page ("/") on successful login
      navigate('/Home');
      
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  
    setLoading(false);
  };
  

  return (
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
          Please enter your login credentials.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
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
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          {error && (
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
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
              '&:hover': { backgroundColor: "#115293" },
            }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2" sx={{ textDecoration: "none", color: "#1976d2" }}>
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
