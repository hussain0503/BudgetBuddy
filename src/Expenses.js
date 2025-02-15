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
import { motion } from "framer-motion";

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

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
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


<Grid container spacing={4} sx={{ mb: 4 }}>
  {[
    { label: "Total Income", value: totalIncome, color: "#4caf50" },
    { label: "Total Expenses", value: totalExpenses, color: "#f44336" },
    {
      label: "Net Balance",
      value: netBalance,
      color: netBalance >= 0 ? "#4caf50" : "#f44336",
    },
  ].map(({ label, value, color }, index) => (
    <Grid item xs={12} sm={4} key={label}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      >
        <Card
          sx={{
            background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
            boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.15)",
            borderRadius: 4,
            p: 3,
            height: "100%",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary" fontWeight="bold">
              {label}
            </Typography>
            <Typography
              variant="h4"
              sx={{ color, fontWeight: "bold", mt: 1 }}
            >
              ${value.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  ))}
</Grid>

<Grid container spacing={4} justifyContent="center">

  <Grid item xs={12} sm={6} display="flex" justifyContent="center">
    <Card
      sx={{
        background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
        boxShadow: "0px 6px 14px rgba(0,0,0,0.15)",
        borderRadius: 4,
        p: 3,
        width: 500, 
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <CardContent>
        <Typography variant="h6" textAlign="center" fontWeight="bold">
          Add Income
        </Typography>
        <TextField
          label="Description"
          name="description"
          value={incomeForm.description}
          onChange={(e) => handleInputChange(e, "income")}
          fullWidth
          variant="outlined"
          sx={{ mb: 3, backgroundColor: "#ffffff" }}
        />
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={incomeForm.amount}
          onChange={(e) => handleInputChange(e, "income")}
          fullWidth
          variant="outlined"
          sx={{ mb: 3, backgroundColor: "#ffffff" }}
        />
        <TextField
          label="Category"
          name="category"
          value={incomeForm.category}
          onChange={(e) => handleInputChange(e, "income")}
          fullWidth
          variant="outlined"
          sx={{ mb: 3, backgroundColor: "#ffffff" }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: 3,
            background: "#1e88e5",
            "&:hover": { background: "#1565c0" },
          }}
          onClick={handleAddIncome}
        >
          Add Income
        </Button>
      </CardContent>
    </Card>
  </Grid>


  <Grid item xs={12} sm={6} display="flex" justifyContent="center">
    <Card
      sx={{
        background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
        boxShadow: "0px 6px 14px rgba(0,0,0,0.15)",
        borderRadius: 4,
        p: 3,
        width: 500, 
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <CardContent>
        <Typography variant="h6" textAlign="center" fontWeight="bold">
          Add Expense
        </Typography>
        <TextField
          label="Description"
          name="description"
          value={expenseForm.description}
          onChange={(e) => handleInputChange(e, "expense")}
          fullWidth
          variant="outlined"
          sx={{ mb: 3, backgroundColor: "#ffffff" }}
        />
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={expenseForm.amount}
          onChange={(e) => handleInputChange(e, "expense")}
          fullWidth
          variant="outlined"
          sx={{ mb: 3, backgroundColor: "#ffffff" }}
        />
        <TextField
          label="Category"
          name="category"
          value={expenseForm.category}
          onChange={(e) => handleInputChange(e, "expense")}
          fullWidth
          variant="outlined"
          sx={{ mb: 3, backgroundColor: "#ffffff" }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: 3,
            background: "#1e88e5",
            "&:hover": { background: "#1565c0" },
          }}
          onClick={handleAddExpense}
        >
          Add Expense
        </Button>
      </CardContent>
    </Card>
  </Grid>


{incomeData.length > 0 && (
  <Grid item xs={12} sm={6} display="flex" justifyContent="center">
    <motion.div initial="hidden" animate="visible" variants={chartVariants}>
      <Card
        sx={{
          background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
          boxShadow: "0px 6px 14px rgba(0,0,0,0.15)",
          borderRadius: 4,
          p: 3,
          width: 500,
          height: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          fontWeight="bold"
          mb={2}
          color="#1e88e5"
        >
          Income Distribution
        </Typography>
        <PieChart width={320} height={320}>
          <Pie
            data={incomeData}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="value"
            animationDuration={600}
            animationEasing="ease-in-out"
            cornerRadius={5} 
          >
            {incomeData.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: "14px", fontWeight: "bold" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: 8,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              color: "#333",
            }}
          />
        </PieChart>
      </Card>
    </motion.div>
  </Grid>
)}


{expenseData.length > 0 && (
  <Grid item xs={12} sm={6} display="flex" justifyContent="center">
    <motion.div initial="hidden" animate="visible" variants={chartVariants}>
      <Card
        sx={{
          background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
          boxShadow: "0px 6px 14px rgba(0,0,0,0.15)",
          borderRadius: 4,
          p: 3,
          width: 500,
          height: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          fontWeight="bold"
          mb={2}
          color="#1e88e5"
        >
          Expense Distribution
        </Typography>
        <PieChart width={320} height={320}>
          <Pie
            data={expenseData}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="value"
            animationDuration={600}
            animationEasing="ease-in-out"
            cornerRadius={5} 
          >
            {expenseData.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: "14px", fontWeight: "bold" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: 8,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              color: "#333",
            }}
          />
        </PieChart>
      </Card>
    </motion.div>
  </Grid>
)}
</Grid>

{expenses.length > 0 && (
  <Grid item xs={12} display="flex" justifyContent="center">
    <motion.div initial="hidden" animate="visible" variants={chartVariants}>
      <Card
        sx={{
          background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
          boxShadow: "0px 6px 14px rgba(0,0,0,0.15)",
          borderRadius: 4,
          p: 3,
          width: 1100,
          transition: "transform 0.2s",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ fontWeight: "bold", mb: 3, color: "#1e88e5" }}
        >
          Income and Expense Over Time
        </Typography>
        <BarChart
          width={1050}
          height={400}
          data={expenses.map((e) => ({
            name: e.description,
            Income: e.isIncome ? e.amount : 0,
            Expense: !e.isIncome ? Math.abs(e.amount) : 0,
          }))}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4caf50" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#4caf50" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f44336" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#f44336" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fontWeight: "bold", fill: "#333" }}
            angle={-15}
            textAnchor="end"
            interval={0}
          />
          <YAxis tick={{ fontSize: 12, fontWeight: "bold", fill: "#333" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: 8,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              color: "#333",
            }}
          />
          <Legend
            wrapperStyle={{
              bottom: 0,
              marginTop: 10,
              fontWeight: "bold",
              fontSize: "14px",
            }}
          />
          <Bar dataKey="Income" fill="url(#incomeGradient)" radius={[5, 5, 0, 0]} />
          <Bar dataKey="Expense" fill="url(#expenseGradient)" radius={[5, 5, 0, 0]} />
        </BarChart>
      </Card>
    </motion.div>
  </Grid>
)}

      </Grid>
    </Box>
  );
};

export default ExpenseTracker;
