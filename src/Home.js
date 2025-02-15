import React from 'react';
import { Box, Typography, Card, Grid, Button } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { motion } from "framer-motion";
import GroupsIcon from '@mui/icons-material/Groups';
import CalculateIcon from '@mui/icons-material/Calculate';


function Home() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f6f9', display: 'flex', flexDirection: 'column' }}>
      
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
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography variant="h2" fontWeight="bold" sx={{ letterSpacing: 2 }}>
            BudgetBuddy
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <Typography variant="h5" fontStyle="italic" sx={{ opacity: 0.9, marginTop: 1 }}>
            Smart, Simple & Powerful Expense Tracking
          </Typography>
        </motion.div>
      </Box>


      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box sx={{ padding: 4, textAlign: 'center', backgroundColor: '#fff', borderRadius: '20px', marginTop: -5 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1976d2', marginBottom: 4 }}>
            How It Works
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[ 
              { title: 'Track Expenses', icon: <TrackChangesIcon fontSize="large" sx={{ color: '#6a1b9a' }} />, desc: 'Easily track your daily, monthly, and yearly expenses.' },
              { title: 'Smart Budgeting', icon: <SavingsIcon fontSize="large" sx={{ color: '#2e7d32' }} />, desc: 'Set & track monthly budgets easily.' },
              { title: 'Bill Splitting', icon: <GroupsIcon fontSize="large" sx={{ color: '#0288d1' }} />, desc: 'Easily split bills with friends and roommates.' },
              { title: 'Manual Split', icon: <CalculateIcon fontSize="large" sx={{ color: '#f57c00' }} />, desc: 'Manually divide bills the way you want.' },
              { title: 'Chatbot', icon: <SmartToyIcon fontSize="large" sx={{ color: '#d84315' }} />, desc: 'Get instant financial tips & insights.' },
            ].map((step, index) => (
              <Grid item xs={12} sm={4} key={index} sx={{ width: '100%' }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.3, ease: "easeOut" }}
                >
                  <Card
                    elevation={8}
                    sx={{
                      padding: 3,
                      textAlign: 'center',
                      borderRadius: '20px',
                      minHeight: '130px', 
                      height: '80%',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
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
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>


      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Box 
          sx={{ 
            background: 'linear-gradient(135deg, #1976d2 30%, #64b5f6)', 
            color: '#fff', 
            padding: 6, 
            textAlign: 'center', 
            borderRadius: '30px', 
            margin: '40px auto', 
            width: { xs: '90%', md: '80%' }, 
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="h3" fontWeight="bold" sx={{ marginBottom: 2, letterSpacing: 1 }}>
            Start Managing Your Finances Today!
          </Typography>
          <Typography variant="h6" sx={{ marginY: 3, opacity: 0.9 }}>
            Join thousands of users who trust BudgetBuddy to take control of their finances.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            href="/expenses"  
            sx={{ 
              paddingX: 4, 
              paddingY: 1.5, 
              borderRadius: '30px', 
              fontWeight: 'bold', 
              backgroundColor: '#fff',
              color: '#1976d2',
              '&:hover': { 
                backgroundColor: '#1976d2', 
                color: '#fff', 
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' 
              } 
            }}
          >
            Get Started
          </Button>
        </Box>
      </motion.div>


      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box 
          sx={{ 
            padding: 6, 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', 
            borderRadius: '30px', 
            margin: '40px auto', 
            width: { xs: '90%', md: '80%' }, 
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', 
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1976d2', letterSpacing: 1 }}>
            Want to Learn More About Us?
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3, color: '#455a64' }}>
            Discover how BudgetBuddy can transform the way you manage your finances.
          </Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large" 
            href="/aboutus" 
            sx={{ 
              paddingX: 4, 
              paddingY: 1.5, 
              borderRadius: '30px', 
              fontWeight: 'bold', 
              borderWidth: 2, 
              '&:hover': { 
                backgroundColor: '#1976d2', 
                color: '#fff', 
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' 
              } 
            }}
          >
            About Us
          </Button>
        </Box>
      </motion.div>

    </Box>
  );
}

export default Home;
