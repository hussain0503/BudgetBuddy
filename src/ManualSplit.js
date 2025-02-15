import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { motion } from "framer-motion";

export default function SplitExpenses() {
  const [expense, setExpense] = useState("");
  const [people, setPeople] = useState([""]);
  const [amounts, setAmounts] = useState([""]);
  const [splitType, setSplitType] = useState("equal");
  const [percentages, setPercentages] = useState([""]);
  const [shares, setShares] = useState([""]);

  const addPerson = () => {
    setPeople([...people, ""]);
    setAmounts([...amounts, ""]);
    setPercentages([...percentages, ""]);
    setShares([...shares, ""]);
  };

  const updatePerson = (index, value) => {
    const newPeople = [...people];
    newPeople[index] = value;
    setPeople(newPeople);
  };

  const updateAmount = (index, value) => {
    const newAmounts = [...amounts];
    newAmounts[index] = value;
    setAmounts(newAmounts);
  };

  const updatePercentage = (index, value) => {
    const newPercentages = [...percentages];
    newPercentages[index] = value;
    setPercentages(newPercentages);
  };

  const updateShares = (index, value) => {
    const newShares = [...shares];
    newShares[index] = value;
    setShares(newShares);
  };

  const calculateSplit = () => {
    if (splitType === "equal") {
      const equalShare = expense / people.length;
      return people.map((person) => ({
        person,
        amountOwed: equalShare || 0,
      }));
    } else if (splitType === "percentage") {
      return people.map((person, index) => ({
        person,
        amountOwed: (percentages[index] / 100) * expense || 0,
      }));
    } else if (splitType === "shares") {
      const totalShares = shares.reduce((sum, share) => sum + parseInt(share || 0, 10), 0);
      return people.map((person, index) => ({
        person,
        amountOwed: (shares[index] / totalShares) * expense || 0,
      }));
    } else {
      return people.map((person, index) => ({
        person,
        amountOwed: parseFloat(amounts[index]) || 0,
      }));
    }
  };

  return (
    <Container maxWidth="xl" sx={{ padding: "40px", backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
                boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.15)",
                borderRadius: 4,
                p: 4,
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center">
                  Split an Expense
                </Typography>
                <TextField
                  label="Expense Amount"
                  type="number"
                  value={expense}
                  onChange={(e) => setExpense(parseFloat(e.target.value) || "")}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 3, backgroundColor: "#ffffff" }}
                />
               <FormControl fullWidth sx={{ mb: 3, mt: 1.5 }}>
  <InputLabel id="split-type-label">Split Type</InputLabel>
  <Select
    labelId="split-type-label"
    value={splitType}
    onChange={(e) => setSplitType(e.target.value)}
    label="Split Type"
  >
    <MenuItem value="equal">Equal Split</MenuItem>
    <MenuItem value="unequal">Unequal Split</MenuItem>
    <MenuItem value="percentage">Percentage-Based Split</MenuItem>
    <MenuItem value="shares">Shares-Based Split</MenuItem>
  </Select>
</FormControl>


                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Participants
                </Typography>
                {people.map((person, index) => (
                  <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                    <Grid item xs={4}>
                      <TextField
                        label="Name"
                        type="text"
                        value={person}
                        onChange={(e) => updatePerson(index, e.target.value)}
                        fullWidth
                        variant="outlined"
                        sx={{ backgroundColor: "#ffffff" }}
                      />
                    </Grid>
                    {splitType === "unequal" && (
                      <Grid item xs={4}>
                        <TextField
                          label="Amount Paid"
                          type="number"
                          value={amounts[index]}
                          onChange={(e) => updateAmount(index, e.target.value)}
                          fullWidth
                          variant="outlined"
                          sx={{ backgroundColor: "#ffffff" }}
                        />
                      </Grid>
                    )}
                    {splitType === "percentage" && (
                      <Grid item xs={4}>
                        <TextField
                          label="Percentage (%)"
                          type="number"
                          value={percentages[index]}
                          onChange={(e) => updatePercentage(index, e.target.value)}
                          fullWidth
                          variant="outlined"
                          sx={{ backgroundColor: "#ffffff" }}
                        />
                      </Grid>
                    )}
                    {splitType === "shares" && (
                      <Grid item xs={4}>
                        <TextField
                          label="Shares"
                          type="number"
                          value={shares[index]}
                          onChange={(e) => updateShares(index, e.target.value)}
                          fullWidth
                          variant="outlined"
                          sx={{ backgroundColor: "#ffffff" }}
                        />
                      </Grid>
                    )}
                  </Grid>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addPerson}
                  sx={{
                    mt: 2,
                    py: 1.2,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    borderRadius: 3,
                    background: "#1e88e5",
                    "&:hover": { background: "#1565c0" },
                  }}
                  fullWidth
                >
                  + Add Person
                </Button>
                <div style={{ marginTop: "20px" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Split Results
                  </Typography>
                  {calculateSplit().map((result, index) => (
                    <Typography key={index} sx={{ mt: 1, fontSize: "1rem", color: "#333" }}>
                      {result.person || "Someone"} owes:{" "}
                      <span style={{ fontWeight: "bold", color: "#f44336" }}>${result.amountOwed.toFixed(2)}</span>
                    </Typography>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
}