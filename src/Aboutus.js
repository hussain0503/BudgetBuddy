import React from "react";
import { Container, CssBaseline, Typography, Box, Grid, Paper, Divider } from "@mui/material";

function AboutUs() {
  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          width: "100%", // Widen the container
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            color: "#1976d2", // Blue color for the header
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

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={6}>
          {/* Our Mission */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 2,
                borderRadius: 2,
                height: "100%", // Ensure equal height
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
                Our mission at BudgetBuddy is to simplify personal finance management. We believe that everyone
                should have the power to manage their money with confidence and ease. By providing intuitive
                tools, we empower users to track their spending, set realistic goals, and work toward financial
                freedom without the stress.
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                We want to take the complexity out of budgeting and offer a simple, clear solution that fits
                seamlessly into your daily life.
              </Typography>
              <Typography variant="body1" sx={{ mt: 3, textAlign: "center" }}>
                Our goal is to foster financial literacy by providing clear insights into your financial habits and
                helping you make better choices for your future. We aim to create a community of individuals who
                are empowered to take control of their finances and achieve their financial goals with confidence.
              </Typography>
            </Paper>
          </Grid>

          {/* Key Features */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 2,
                borderRadius: 2,
                height: "100%", // Ensure equal height
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}>
                Key Features
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
                BudgetBuddy offers a range of features to help you stay on top of your finances:
              </Typography>
              <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                <Typography variant="body1" sx={{ textAlign: "center", mb: 1 }}>
                  - Expense Tracking: Easily track your daily expenses with customizable categories.
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center", mb: 1 }}>
                  - Real-Time Budgeting: Stay updated with your budget at all times, seeing exactly where your
                  money is going.
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center", mb: 1 }}>
                  - Savings Goals: Set specific savings targets and monitor your progress in real time.
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center", mb: 1 }}>
                  - Detailed Analytics: Get insights and reports to understand your spending habits.
                </Typography>
              </ul>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4, textAlign: "center", color: "#1976d2" }}>
          Our Vision
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
          Our vision is to become the go-to financial companion for individuals worldwide, providing accessible
          tools that guide them toward achieving financial independence. We want BudgetBuddy to be synonymous with
          financial clarity, empowering everyone to make smart, informed decisions with their money.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4, textAlign: "center", color: "#1976d2" }}>
          Meet the Creator
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
          BudgetBuddy is built by a passionate team of developers, designers, and financial experts who are dedicated
          to simplifying personal finance. Our team combines tech expertise with financial knowledge to create a
          solution that truly helps users.
        </Typography>

        <Grid container justifyContent="center" spacing={4}>
          <Grid item xs={12} md={6}>
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
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: "#1976d2" }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
          Have any questions or suggestions? We’d love to hear from you! Reach out to us at{" "}
          <a href="mailto:support@budgetbuddy.com" style ={{color:"black"}}>hussainzmantri@gmail.com</a>.
        </Typography>
      </Box>
    </Container>
  );
}

export default AboutUs;
