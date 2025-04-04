import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container,Card, CardContent, Typography, Paper, Box } from "@mui/material";
import { Bar, Pie, Line } from "react-chartjs-2";
import { 
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, 
  Legend, ArcElement, PointElement, LineElement 
} from "chart.js";
ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, 
  ArcElement, PointElement, LineElement
);

const AnalyticsPage = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);

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

  const incomeData = transactions.filter(tx => tx.type.toLowerCase() === "income");
  const expenseData = transactions.filter(tx => tx.type.toLowerCase() === "expense");

  const totalIncome = incomeData.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  const totalExpense = expenseData.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const getCategoryTotals = (data) =>
    data.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + parseFloat(tx.amount);
      return acc;
    }, {});

  const incomeCategories = getCategoryTotals(incomeData);
  const expenseCategories = getCategoryTotals(expenseData);

  const incomeBarData = {
    labels: Object.keys(incomeCategories),
    datasets: [{ label: "Income ($)", data: Object.values(incomeCategories), backgroundColor: "#4CAF50" }],
  };

  const expenseBarData = {
    labels: Object.keys(expenseCategories),
    datasets: [{ label: "Expenses ($)", data: Object.values(expenseCategories), backgroundColor: "#FF5252" }],
  };

  const incomeVsExpenseBarData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Income",
        data: [totalIncome, 0], 
        backgroundColor: "#4CAF50",
      },
      {
        label: "Expenses",
        data: [0, totalExpense], 
        backgroundColor: "#FF5252",
      }
    ],
  };
  

  const incomePieData = {
    labels: Object.keys(incomeCategories),
    datasets: [{ data: Object.values(incomeCategories), backgroundColor: ["#3F51B5", "#009688", "#E91E63", "#FFC107"] }],
  };

  const expensePieData = {
    labels: Object.keys(expenseCategories),
    datasets: [{ data: Object.values(expenseCategories), backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"] }],
  };

  let cumulativeSavings = 0;
  const savingsOverTime = transactions
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((tx) => {
      cumulativeSavings += tx.type.toLowerCase() === "income" ? parseFloat(tx.amount) : -parseFloat(tx.amount);
      return { date: new Date(tx.date).toLocaleDateString(), savings: cumulativeSavings };
    });

  const lineChartData = {
    labels: savingsOverTime.map(entry => entry.date),
    datasets: [{ label: "Cumulative Savings ($)", data: savingsOverTime.map(entry => entry.savings), borderColor: "#673AB7", fill: false }],
  };

  const getMonthlyData = (data) => {
    return data.reduce((acc, tx) => {
      const month = new Date(tx.date).toLocaleString("default", { month: "short", year: "numeric" });
      acc[month] = (acc[month] || 0) + parseFloat(tx.amount);
      return acc;
    }, {});
  };
  
  const monthlyIncome = getMonthlyData(incomeData);
  const monthlyExpenses = getMonthlyData(expenseData);
  const allMonths = [...new Set([...Object.keys(monthlyIncome), ...Object.keys(monthlyExpenses)])].sort(
    (a, b) => new Date(a) - new Date(b)
  );
  
  const monthlyIncomeData = {
    labels: allMonths,
    datasets: [
      {
        label: "Monthly Income ($)",
        data: allMonths.map((month) => monthlyIncome[month] || 0),
        borderColor: "#4CAF50",
        fill: false,
      },
    ],
  };
  
  const monthlyExpenseData = {
    labels: allMonths,
    datasets: [
      {
        label: "Monthly Expenses ($)",
        data: allMonths.map((month) => monthlyExpenses[month] || 0),
        borderColor: "#FF5252",
        fill: false,
      },
    ],
  };
  
  const incomeVsExpenseData = {
    labels: allMonths,
    datasets: [
      {
        label: "Monthly Income ($)",
        data: allMonths.map((month) => monthlyIncome[month] || 0),
        borderColor: "#4CAF50",
        fill: false,
      },
      {
        label: "Monthly Expenses ($)",
        data: allMonths.map((month) => monthlyExpenses[month] || 0),
        borderColor: "#FF5252",
        fill: false,
      },
    ],
  };
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          textAlign: "center",
          borderRadius: 4,
          mb: 4,
          background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
          boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.15)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Financial Analytics Dashboard
        </Typography>
      </Paper>

      <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={3}>

        {[incomeBarData, expenseBarData, incomeVsExpenseBarData].map((data, i) => (
          <Card key={i} sx={{ flex: "1 1 30%", minWidth: 300 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {["Income Breakdown", "Expense Breakdown", "Income vs Expenses"][i]}
              </Typography>
              <Bar data={data} height={200} />
            </CardContent>
          </Card>
        ))}

        {[incomePieData, expensePieData].map((data, i) => (
          <Card
            key={i}
            sx={{
              flex: "1 1 45%",
              minWidth: 300,
              height: 370,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent sx={{ width: "100%", height: "100%" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                textAlign="center"
                sx={{ mb: 1 }}
              >
                {["Income Distribution", "Expense Distribution"][i]}
              </Typography>
              <Pie
                data={data}
                options={{ responsive: true, maintainAspectRatio: false }}
                style={{ height: "180px", width: "180px", margin: "auto" }}
              />
            </CardContent>
          </Card>
        ))}

        {[monthlyIncomeData, monthlyExpenseData, incomeVsExpenseData].map((data, i) => (
          <Card key={i} sx={{ flex: "1 1 30%", minWidth: 300 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {["Monthly Income Trends", "Monthly Expense Trends", "Income vs Expense Over Time"][i]}
              </Typography>
              <Line data={data} height={200} />
            </CardContent>
          </Card>
        ))}

        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Cumulative Savings Over Time
            </Typography>
            <Line data={lineChartData} height={200} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AnalyticsPage;