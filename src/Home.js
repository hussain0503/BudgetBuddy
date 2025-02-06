import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { Add, ShowChart } from '@mui/icons-material'; // Adding icons for buttons

function Home() {
  // Data for summary section
  const totalExpenses = 1250.00;
  const totalIncome = 3000.00;
  const savings = 750.00;
  const netBalance = totalIncome - totalExpenses;

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f7f8fb', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', marginBottom: 8 }}>
        <Typography variant="h3" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to BudgetBuddy
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ fontStyle: 'italic', fontSize: '1.2rem' }}>
          Your personal expense tracker to keep your finances in check!
        </Typography>
      </Box>

      {/* Summary Section */}
      <Grid container spacing={4} sx={{ marginBottom: 6 }} justifyContent="center">
        {[ 
          { title: 'Total Expenses', value: `$${totalExpenses.toFixed(2)}` },
          { title: 'Total Income', value: `$${totalIncome.toFixed(2)}` },
          { title: 'Net Balance', value: `$${netBalance.toFixed(2)}` },
        ].map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              elevation={8}
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 2,
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                },
                transition: '0.3s',
              }}
            >
              <CardContent>
                <Typography variant="h6" color="textSecondary" gutterBottom sx={{ fontWeight: '500' }}>
                  {item.title}
                </Typography>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', letterSpacing: '1px' }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Features Section */}
      <Box sx={{ textAlign: 'center', marginBottom: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          What You Can Do
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
          - Track your daily expenses <br />
          - Set and monitor monthly budgets <br />
          - Analyze spending patterns
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Add />}
          sx={{
            borderRadius: '12px',
            paddingX: 5,
            textTransform: 'none',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#1976d2',
              boxShadow: '0 8px 14px rgba(0, 0, 0, 0.15)',
            },
            transition: '0.3s',
          }}
        >
          Add Expense
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          startIcon={<ShowChart />}
          sx={{
            borderRadius: '12px',
            paddingX: 5,
            textTransform: 'none',
            borderColor: '#f50057',
            color: '#f50057',
            '&:hover': {
              backgroundColor: '#f50057',
              color: 'white',
              borderColor: '#f50057',
              boxShadow: '0 8px 14px rgba(0, 0, 0, 0.15)',
            },
            transition: '0.3s',
          }}
        >
          View Reports
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
