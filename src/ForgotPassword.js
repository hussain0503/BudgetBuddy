import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Link
} from "@mui/material";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/api/auth/request-reset", { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
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
            p: 5,
            borderRadius: 3,
            textAlign: "center",
            bgcolor: "white",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Forgot Password
          </Typography>

          <Typography variant="body2" color="textSecondary" mb={3}>
            Enter your registered email to receive a password reset link.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                py: 1.2,
                fontWeight: "bold",
                fontSize: "16px",
                ":hover": {
                  backgroundColor: "#1565c0",
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Send Reset Link"}
            </Button>
          </form>

          {message && (
            <Typography
              variant="body2"
              color={message.toLowerCase().includes("success") ? "green" : "error"}
              mt={3}
            >
              {message}
            </Typography>
          )}
          <Box mt={3} display="flex" justifyContent="flex-start">
  <Link
    href="/login"
    variant="body2" sx={{ textDecoration: "none", color: "#1976d2" }}>
    Go back to Sign in
  </Link>
</Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default ForgotPassword;
