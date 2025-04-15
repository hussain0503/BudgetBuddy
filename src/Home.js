import React from 'react';
import { Box, Typography, Card, Button } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import GroupsIcon from '@mui/icons-material/Groups';
import CalculateIcon from '@mui/icons-material/Calculate';
import { motion } from "framer-motion";

function Home() {
  const steps = [
    { title: 'Smart Budgeting', icon: <SavingsIcon fontSize="large" sx={{ color: '#2e7d32' }} />, desc: 'Set & track daily, monthly and yearly budgets easily.' },
    { title: 'Analytics', icon: <TrackChangesIcon fontSize="large" sx={{ color: '#7b1fa2' }} />, desc: 'Visualize your spending patterns with insightful charts.' },
    { title: 'Bill Splitting', icon: <GroupsIcon fontSize="large" sx={{ color: '#0288d1' }} />, desc: 'Easily split bills with friends and roommates.' },
    { title: 'Manual Split', icon: <CalculateIcon fontSize="large" sx={{ color: '#f57c00' }} />, desc: 'Manually divide bills the way you want.' },
    { title: 'Chatbot', icon: <SmartToyIcon fontSize="large" sx={{ color: '#d84315' }} />, desc: 'Get instant financial tips & insights.' },
  ];

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        backgroundColor: '#f4f6f9', 
        display: 'flex', 
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'clip'  
      }}
    >
      
      <Box
        sx={{
          flexShrink: 0,
          height: '40vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundImage: 'linear-gradient(135deg, #1976d2 30%, #64b5f6)',
          color: '#fff',
          padding: 4,
          borderRadius: '0 0 40px 40px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography variant="h2" fontWeight="bold" sx={{ letterSpacing: 2 }}>
            BudgetBuddy
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <Typography variant="h5" fontStyle="italic" sx={{ opacity: 0.9, marginTop: 1 }}>
            Smart, Simple & Powerful Expense Tracking
          </Typography>
        </motion.div>
      </Box>

      
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box sx={{ padding: 4, paddingTop: 8, textAlign: 'center', backgroundColor: '#fff', borderRadius: '20px' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1976d2', marginBottom: 4 }}>
          Feature-Rich. User-Focused.
          </Typography>
          
          <Box 
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3, ease: "easeOut" }}
              >
                <Card
                  elevation={8}
                  sx={{
                    padding: 3,
                    textAlign: 'center',
                    borderRadius: '20px',
                    width: { xs: '260px', sm: '280px', md: '300px' },
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    minHeight: '130px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  {step.icon}
                  <Typography variant="h6" fontWeight="bold" sx={{ marginY: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {step.desc}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Box>
      </motion.div>

      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          width: '100%',
          background: 'linear-gradient(to right, #1976d2, #64b5f6)',
          padding: '80px 20px',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2, letterSpacing: 1 }}>
          Take Control of Your Finances
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Thousands are already managing their money smarter with BudgetBuddy.
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/transaction"
          sx={{
            px: 5,
            py: 1.5,
            fontWeight: 'bold',
            borderRadius: '50px',
            backgroundColor: '#fff',
            color: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
              color: '#fff',
            },
          }}
        >
          Get Started
        </Button>
      </motion.section>

      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          width: '100%',
          background: '#f9f9f9',
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2, color: '#1976d2' }}>
          Curious About Us?
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: '#555' }}>
          Learn more about our mission and how BudgetBuddy is changing financial planning.
        </Typography>
        <Button
          variant="outlined"
          size="large"
          href="/aboutus"
          sx={{
            px: 5,
            py: 1.5,
            fontWeight: 'bold',
            borderRadius: '50px',
            borderColor: '#1976d2',
            color: '#1976d2',
            '&:hover': {
              backgroundColor: '#1976d2',
              color: '#fff',
            },
          }}
        >
          About Us
        </Button>
      </motion.section>
    </Box>
  );
}

export default Home;
