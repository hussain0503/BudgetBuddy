import React from "react";
import { Box, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(90deg, #1976d2 0%, #21cbf3 100%)",
        color: "white",
        py: 3,
        px: 2,
        mt: "auto",
        textAlign: "center",
        boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        BudgetBuddy &copy; {new Date().getFullYear()}
      </Typography>
      <Typography variant="body2">
        <Link href="/privacypolicy" sx={{ color: "white", textDecoration: "none" }}>
          Privacy Policy
        </Link>{" "}
        | {" "}
        <Link href="/TermsofService" sx={{ color: "white", textDecoration: "none" }}>
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
