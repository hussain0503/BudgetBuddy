import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
    } else {
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
    }
  };

  const totalIncome = expenses
    .filter((e) => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses
    .filter((e) => e.amount < 0)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  const incomeData = expenses
    .filter((e) => e.isIncome)
    .map((e) => ({ name: e.category, value: e.amount }));
  const expenseData = expenses
    .filter((e) => !e.isIncome)
    .map((e) => ({ name: e.category, value: Math.abs(e.amount) }));

  return (
    <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#f0f4f8" }}>
      <Grid container spacing={4} sx={{ maxWidth: 1200, margin: "auto" }}>

        {/* Overview Section */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
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

        {/* Add Income & Expense Forms */}
        {["income", "expense"].map((type) => (
          <Grid item xs={12} sm={6} key={type}>
            <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
                  {type === "income" ? "Add Income" : "Add Expense"}
                </Typography>
                <TextField
                  label="Description"
                  name="description"
                  value={type === "income" ? incomeForm.description : expenseForm.description}
                  onChange={(e) => handleInputChange(e, type)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Amount"
                  name="amount"
                  type="number"
                  value={type === "income" ? incomeForm.amount : expenseForm.amount}
                  onChange={(e) => handleInputChange(e, type)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Category"
                  name="category"
                  value={type === "income" ? incomeForm.category : expenseForm.category}
                  onChange={(e) => handleInputChange(e, type)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={type === "income" ? handleAddIncome : handleAddExpense}
                >
                  {type === "income" ? "Add Income" : "Add Expense"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Charts Section */}
        {incomeData.length > 0 && (
  <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
    <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3, width: "100%", maxWidth: 600, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h6" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
        Income Distribution
      </Typography>
      <PieChart width={300} height={300}>
        <Pie
          data={incomeData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          dataKey="value"
        >
          {incomeData.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Card>
  </Grid>
)}

{expenseData.length > 0 && (
  <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
    <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3, width: "100%", maxWidth: 600, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h6" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
        Expense Distribution
      </Typography>
      <PieChart width={300} height={300}>
        <Pie
          data={expenseData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          dataKey="value"
        >
          {expenseData.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Card>
  </Grid>
)}

        {/* Bar Chart */}
        {expenses.length > 0 && (
  <Grid item xs={12}>
    <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
      <Typography variant="h6" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
        Income and Expense Over Time
      </Typography>
      <BarChart
        width={1100}
        height={400}
        data={expenses.map((e) => ({
          name: e.description,
          Income: e.isIncome ? e.amount : 0,
          Expense: !e.isIncome ? Math.abs(e.amount) : 0,
        }))}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Income" fill="#4caf50" />
        <Bar dataKey="Expense" fill="#f44336" />
      </BarChart>
    </Card>
  </Grid>
)}
      </Grid>
    </Box>
  );
};

export default ExpenseTracker;
