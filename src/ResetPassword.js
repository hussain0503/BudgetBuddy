import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/auth/resetpassword", {
        token,
        newPassword,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={2}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: 540 }} 
      >
        <Paper
          elevation={4}
          sx={{
            p: 4, 
            borderRadius: 4,
            textAlign: "center",
            bgcolor: "white",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Reset Password
          </Typography>

          <Typography variant="body2" color="textSecondary" mb={3}>
            Enter your new password and confirm it below.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              margin="normal"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              margin="normal"
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                py: 1.3,
                fontWeight: "bold",
                fontSize: "16px",
                ":hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Reset Password
            </Button>
          </form>

          {error && (
            <Typography variant="body2" color="error" mt={3}>
              {error}
            </Typography>
          )}
          {message && (
            <Typography variant="body2" color="green" mt={3}>
              {message}
            </Typography>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
};

export default ResetPassword;
