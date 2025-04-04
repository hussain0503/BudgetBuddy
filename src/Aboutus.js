import React from "react";
import { Container, CssBaseline, Typography, Box, Paper, Divider } from "@mui/material";
import { motion } from "framer-motion";

function AboutUs() {
  const sections = [
    {
      title: "Our Mission",
      text: `Our mission at BudgetBuddy is to simplify personal finance management. 
      We believe that everyone should have the power to manage their money with confidence and ease.`,
    },
    {
      title: "Key Features",
      text: `BudgetBuddy offers a range of features like expense tracking, real-time budgeting, 
      savings goals, and detailed analytics to help you stay on top of your finances.`,
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            padding: 4,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
            width: "100%",
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 4,
                color: "#1976d2", 
                textAlign: "center",
              }}
            >
              About BudgetBuddy
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, textAlign: "center" }}>
              BudgetBuddy is your trusted companion in managing personal finances. It offers intuitive tools for
              expense tracking, budgeting, and setting financial goals. Our aim is to help individuals make informed
              financial decisions and work toward financial independence.
            </Typography>
          </motion.div>

          <Divider sx={{ mb: 4 }} />

          <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={4}>
            {sections.map((section, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: index * 0.3 }}
                style={{ flex: "1 1 45%" }}
              >
                <Paper
                  sx={{
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: 2,
                    borderRadius: 2,
                    height: "100%",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}>
                    {section.title}
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    {section.text}
                  </Typography>
                </Paper>
              </motion.div>
            ))}
          </Box>

          <Divider sx={{ my: 4 }} />

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4, textAlign: "center", color: "#1976d2" }}>
              Our Vision
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
              Our vision is to become the go-to financial companion for individuals worldwide, providing accessible
              tools that guide them toward achieving financial independence.
            </Typography>
          </motion.div>

          <Divider sx={{ my: 4 }} />

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4, textAlign: "center", color: "#1976d2" }}>
              Meet the Creator
            </Typography>
          </motion.div>

          <Box display="flex" justifyContent="center" mt={4}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 1 }}
              style={{ flex: "1 1 100%", maxWidth: "600px" }}
            >
              <Paper sx={{ padding: 3, boxShadow: 2, borderRadius: 2, textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}>
                  Hussain Mantri
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Software Engineer
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Hussain is a tech enthusiast with a passion for making finance accessible to all. With a deep
                  understanding of both technology and financial management, he leads BudgetBuddy with a focus on
                  simplicity, innovation, and user experience.
                </Typography>
              </Paper>
            </motion.div>
          </Box>

          <Divider sx={{ my: 4 }} />

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: "#1976d2" }}>
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
              Have any questions or suggestions? We’d love to hear from you! Reach out to us at{" "}
              <a href="mailto:hussainzmantri@gmail.com" style={{ color: "black" }}>hussainzmantri@gmail.com</a>.
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </motion.div>
  );
}

export default AboutUs;
