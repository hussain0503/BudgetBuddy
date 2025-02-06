import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
} from "@mui/material";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomeForm, setIncomeForm] = useState({
    description: "",
    amount: "",
    category: "",
  });
  const [expenseForm, setExpenseForm] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "income") {
      setIncomeForm({ ...incomeForm, [name]: value });
    } else if (formType === "expense") {
      setExpenseForm({ ...expenseForm, [name]: value });
    }
  };

  const handleAddIncome = () => {
    if (incomeForm.description && incomeForm.amount && incomeForm.category) {
      setExpenses([
        ...expenses,
        { ...incomeForm, amount: parseFloat(incomeForm.amount), isIncome: true },
      ]);
      setIncomeForm({ description: "", amount: "", category: "" });
    } else {
      alert("Please fill in all fields for income.");
    }
  };

  const handleAddExpense = () => {
    if (expenseForm.description && expenseForm.amount && expenseForm.category) {
      setExpenses([
        ...expenses,
        {
          ...expenseForm,
          amount: -parseFloat(expenseForm.amount),
          isIncome: false,
        },
      ]);
      setExpenseForm({ description: "", amount: "", category: "" });
    } else {
      alert("Please fill in all fields for expense.");
    }
  };

  const totalIncome = expenses
    .filter((e) => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses
    .filter((e) => e.amount < 0)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", mb: 4, color: "#1976d2" }}
      >
        Expenses and Income
      </Typography>

      {/* Overview Section */}
      <Grid container spacing={4} sx={{ mb: 4, maxWidth: 900 }}>
        {[
          { label: "Total Income", value: totalIncome, color: "#4caf50" },
          { label: "Total Expenses", value: totalExpenses, color: "#f44336" },
          {
            label: "Net Balance",
            value: netBalance,
            color: netBalance >= 0 ? "#4caf50" : "#f44336",
          },
        ].map(({ label, value, color }) => (
          <Grid item xs={12} sm={4} key={label}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: 3,
                padding: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  {label}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  ${value.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Forms Section */}
      <Grid container spacing={4} sx={{ maxWidth: 900 }}>
        {/* Add Income Form */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 4,
              backgroundColor: "#ffffff",
              borderRadius: 4,
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 3, color: "#1976d2" }}
            >
              Add Income
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={incomeForm.description}
                  onChange={(e) => handleInputChange(e, "income")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount"
                  name="amount"
                  type="number"
                  value={incomeForm.amount}
                  onChange={(e) => handleInputChange(e, "income")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Category"
                  name="category"
                  value={incomeForm.category}
                  onChange={(e) => handleInputChange(e, "income")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddIncome}
                  fullWidth
                >
                  Add Income
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Add Expense Form */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 4,
              backgroundColor: "#ffffff",
              borderRadius: 4,
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 3, color: "#1976d2" }}
            >
              Add Expense
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={expenseForm.description}
                  onChange={(e) => handleInputChange(e, "expense")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount"
                  name="amount"
                  type="number"
                  value={expenseForm.amount}
                  onChange={(e) => handleInputChange(e, "expense")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Category"
                  name="category"
                  value={expenseForm.category}
                  onChange={(e) => handleInputChange(e, "expense")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddExpense}
                  fullWidth
                >
                  Add Expense
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpenseTracker;
