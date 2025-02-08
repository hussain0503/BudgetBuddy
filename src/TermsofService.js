import React from "react";
import { Container, CssBaseline, Typography, Box, Divider } from "@mui/material";

function TermsOfService() {
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
            color: "#1976d2", 
          }}
        >
          Terms of Service
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
          Please read these Terms of Service carefully before using our application.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          1. Introduction
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          By accessing or using our service, you agree to comply with these Terms of Service. If you do not agree with any part of the terms, you may not use the service.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          2. User Responsibilities
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You must immediately notify us of any unauthorized use.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          3. Service Availability
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          While we strive to maintain the availability of our services, we do not guarantee uninterrupted or error-free operation. We reserve the right to modify or discontinue the service at any time without prior notice.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          4. Restrictions
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          You may not use the service for illegal activities or in any way that may harm, disable, or interfere with the operation of the service. Any unauthorized use may result in the suspension of your account.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          5. Limitation of Liability
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Our liability is limited to the fullest extent permitted by law. We are not responsible for any indirect, incidental, or consequential damages arising from the use of the service.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          6. Changes to Terms
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We may update these Terms of Service from time to time. Any changes will be posted on this page with an updated date. By continuing to use the service, you agree to the updated terms.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          7. Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          If you have any questions regarding these Terms of Service, please contact us at hussainzmantri@gmail.com.
        </Typography>
      </Box>
    </Container>
  );
}

export default TermsOfService;
