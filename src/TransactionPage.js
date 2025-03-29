import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container, Card, CardContent, Typography, TextField, Button, Grid, Box, FormControl, InputLabel, Select, MenuItem
  } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useNavigate } from "react-router-dom"; 
import BarChartIcon from "@mui/icons-material/BarChart"; 
import { motion } from "framer-motion";

const TransactionPage = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [incomeData, setIncomeData] = useState({ amount: "", category: "", description: "" });
  const [expenseData, setExpenseData] = useState({ amount: "", category: "", description: "" });
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/transactions/${userId}`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleChange = (e, type) => {
    if (type === "income") {
      setIncomeData({ ...incomeData, [e.target.name]: e.target.value });
    } else {
      setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const formData = type === "income" ? incomeData : expenseData;
    if (!userId || !formData.amount || !formData.category) {
      console.error("Missing required fields");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/transactions", {
        ...formData,
        type,
        userId,
      });

      fetchTransactions();
      if (type === "income") setIncomeData({ amount: "", category: "", description: "" });
      else setExpenseData({ amount: "", category: "", description: "" });
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/transactions/${id}`);
      setTransactions(transactions.filter((tx) => tx._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const totalIncome = transactions
    .filter((tx) => tx.type.toLowerCase() === "income")
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const totalExpense = transactions
    .filter((tx) => tx.type.toLowerCase() === "expense")
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const netBalance = totalIncome - totalExpense;
  const balanceColor = netBalance >= 0 ? "#e8f5e9" : "#ffebee";

    const navigate = useNavigate(); // Initialize navigate function
  

  const columns = [
    { field: "type", headerName: "Type", flex: 1 },
    { field: "amount", headerName: "Amount ($)", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button size="small" color="#FF5252" onClick={() => handleDelete(params.row.id)} startIcon={<DeleteIcon />}>
          Delete
        </Button>
      ),
    },
  ];

  const filteredRows = transactions
  .filter((tx) =>
    (filterType === "all" || tx.type.toLowerCase() === filterType) &&
    (tx.category.toLowerCase().includes(search.toLowerCase()) ||
      tx.description.toLowerCase().includes(search.toLowerCase()))
  )
  .map((tx) => ({
    id: tx._id,
    type: tx.type,
    amount: tx.amount,
    category: tx.category,
    description: tx.description,
  }));


  const rows = transactions.map((tx) => ({
    id: tx._id,
    type: tx.type,
    amount: tx.amount,
    category: tx.category,
    description: tx.description,
  }));

  

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", py: 5 }}>

      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {/* Net Balance, Income & Expenses */}
        <Grid item xs={12} md={4}>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.1 }}
  >
    <Card sx={{ backgroundColor: balanceColor, boxShadow: 3, borderRadius: 2, height: "100%" }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <AccountBalanceIcon fontSize="large" color={netBalance >= 0 ? "success" : "error"} />
          <Typography variant="h6" fontWeight="bold" ml={1}>
            Net Balance: ${netBalance.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </motion.div>
</Grid>

<Grid item xs={12} md={4}>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <Card sx={{ backgroundColor: "#e8f5e9", boxShadow: 3, borderRadius: 2, height: "100%" }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <AttachMoneyIcon fontSize="large" color="success" />
          <Typography variant="h6" fontWeight="bold" ml={1}>
            Total Income: ${totalIncome.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </motion.div>
</Grid>

<Grid item xs={12} md={4}>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    <Card sx={{ backgroundColor: "#ffebee", boxShadow: 3, borderRadius: 2, height: "100%" }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <MoneyOffIcon fontSize="large" color="error" />
          <Typography variant="h6" fontWeight="bold" ml={1}>
            Total Expenses: ${totalExpense.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </motion.div>
</Grid>

        {/* Forms for Income and Expenses */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Add Income
              </Typography>
              <form onSubmit={(e) => handleSubmit(e, "income")}>
                <TextField label="Amount" name="amount" type="number" fullWidth required margin="normal"
                  value={incomeData.amount} onChange={(e) => handleChange(e, "income")} />
                <TextField label="Category" name="category" fullWidth required margin="normal"
                  value={incomeData.category} onChange={(e) => handleChange(e, "income")} />
                <TextField label="Description" name="description" fullWidth margin="normal"
                  value={incomeData.description} onChange={(e) => handleChange(e, "income")} />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2,fontWeight: "bold" }}>
                  Add Income
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Add Expense
              </Typography>
              <form onSubmit={(e) => handleSubmit(e, "expense")}>
  <TextField 
    label="Amount" 
    name="amount" 
    type="number" 
    fullWidth 
    required 
    margin="normal"
    value={expenseData.amount} 
    onChange={(e) => handleChange(e, "expense")} 
  />
  <TextField 
    label="Category" 
    name="category" 
    fullWidth 
    required 
    margin="normal"
    value={expenseData.category} 
    onChange={(e) => handleChange(e, "expense")} 
  />
  <TextField 
    label="Description" 
    name="description" 
    fullWidth 
    margin="normal"
    value={expenseData.description} 
    onChange={(e) => handleChange(e, "expense")} 
  />
  <Button type="submit" variant="contained" fullWidth sx={{ mt: 2,fontWeight: "bold" }}>
    Add Expense
  </Button>
</form>

            </CardContent>
          </Card>
        </Grid>
        

        {/* Transaction List Card */}
<Grid item xs={12}>
  <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
    <CardContent>
      {/* Search and Filter Row */}
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        {/* Search Bar */}
        <TextField
          label="Search (Category/Description)"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "60%" }}
        />

        {/* Filter Dropdown */}
        <FormControl sx={{ width: "35%" }} size="small">
          <InputLabel id="filter-label">Filter by Type</InputLabel>
          <Select
            labelId="filter-label"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            label="Filter by Type"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Data Grid */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
        sx={{
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#1565C0", // Medium-dark blue
            color: "#ffffff",
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#E3F2FD", // Light blue
            color: "#000000",
          },
        }}
      />
    </CardContent>
  </Card>
</Grid>
      </Grid>
       {/* Button to Navigate to Analytics Page */}
<Box display="flex" justifyContent="center" mt={3}>
  <Button
    variant="contained"
    color="primary"
    onClick={() => navigate("/analytics")}
    startIcon={<BarChartIcon />} // Add the icon
    sx={{
      fontWeight: "bold",
      fontSize: "1rem",
      px: 3,
      py: 1,
      transition: "0.3s",
      "&:hover": {
        backgroundColor: "#0D47A1",
        transform: "scale(1.05)", // Slight pop effect
      },
    }}
  >
    Go to Analytics
  </Button>
</Box>
    </Container>
  );
};

export default TransactionPage;
