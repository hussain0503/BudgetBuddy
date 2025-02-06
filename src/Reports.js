import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import DeleteIcon from "@mui/icons-material/Delete";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    isIncome: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleToggleChange = (e) => {
    setForm({ ...form, isIncome: e.target.checked });
  };

  const handleAddExpense = () => {
    if (form.description && form.amount && form.category) {
      const signedAmount = form.isIncome
        ? parseFloat(form.amount)
        : -parseFloat(form.amount);
      setExpenses([...expenses, { ...form, amount: signedAmount }]);
      setForm({ description: "", amount: "", category: "", isIncome: false });
    }
  };

  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const totalIncome = expenses
    .filter((e) => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses
    .filter((e) => e.amount < 0)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  const categories = [...new Set(expenses.map((e) => e.category))];
  const categoryData = categories.map((cat) =>
    expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + Math.abs(e.amount), 0)
  );

  const chartData = {
    labels: categories,
    datasets: [
      {
        data: categoryData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const lineData = {
    labels: expenses.map((_, index) => `Entry ${index + 1}`),
    datasets: [
      {
        label: "Income",
        data: expenses.map((e) => (e.amount > 0 ? e.amount : 0)),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
      {
        label: "Expenses",
        data: expenses.map((e) => (e.amount < 0 ? Math.abs(e.amount) : 0)),
        borderColor: "#f44336",
        backgroundColor: "rgba(244, 67, 54, 0.2)",
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 4,
          color: "#3f51b5",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        Expense Tracker
      </Typography>

      {/* Overview Section */}
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
        {[
          { label: "Total Income", value: totalIncome, color: "#4caf50" },
          { label: "Total Expenses", value: totalExpenses, color: "#f44336" },
          {
            label: "Net Balance",
            value: netBalance,
            color: netBalance >= 0 ? "#4caf50" : "#f44336",
          },
        ].map(({ label, value, color }) => (
          <Grid item xs={12} sm={6} md={4} key={label}>
            <Card
              sx={{
                boxShadow: 6,
                borderRadius: 3,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {label}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color, fontWeight: "bold", textShadow: "1px 1px #ccc" }}
                >
                  ${value.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Reports Section */}
      <Box
        sx={{
          p: 4,
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 6,
          mb: 4,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#3f51b5" }}
        >
          Reports
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, boxShadow: 6, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Pie Chart - Expenses by Category
              </Typography>
              <Doughnut data={chartData} />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, boxShadow: 6, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Bar Chart - Income vs Expenses
              </Typography>
              <Bar data={barData} />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ p: 3, boxShadow: 6, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Line Chart - Income and Expenses Over Time
              </Typography>
              <Line data={lineData} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ExpenseTracker;
