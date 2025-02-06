import React from "react";
import { Container, CssBaseline, Typography, Box, Divider } from "@mui/material";

function PrivacyPolicy() {
  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#1976d2", // Blue color for the header
          }}
        >
          Privacy Policy
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
          This Privacy Policy explains how we collect, use, and protect your personal data.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We collect personal information that you provide to us, including your name, email address, and
          any other details that you share when using our services. This information is used to improve user
          experience and for communication purposes.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The information we collect is used to enhance and personalize your experience, process transactions,
          and send you important notifications, including promotional messages (if you’ve opted in).
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          3. Data Security
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We implement a variety of security measures to maintain the safety of your personal information. However,
          we cannot guarantee the complete security of your data as no method of transmission over the Internet is
          100% secure.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          4. Sharing Your Information
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We do not sell, trade, or rent your personal information to third parties. However, we may share your data
          with trusted service providers to perform specific services on our behalf, like sending emails or providing
          customer support.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          5. Your Rights
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          You have the right to access, correct, or delete your personal information. You may also opt-out of receiving
          marketing communications at any time.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          6. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We may update this Privacy Policy from time to time. Any changes will be reflected on this page with the
          updated date.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          7. Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          If you have any questions regarding this Privacy Policy, please contact us at support@yourapp.com.
        </Typography>
      </Box>
    </Container>
  );
}

export default PrivacyPolicy;
