import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { Delete } from "@mui/icons-material";

export default function SplitExpenses() {
  const [expense, setExpense] = useState("");
  const [people, setPeople] = useState([""]);
  const [amounts, setAmounts] = useState([""]);
  const [splitType, setSplitType] = useState("equal");
  const [percentages, setPercentages] = useState([""]);
  const [shares, setShares] = useState([""]);
  const [error, setError] = useState("");

  const addPerson = () => {
    setPeople([...people, ""]);
    setAmounts([...amounts, ""]);
    setPercentages([...percentages, ""]);
    setShares([...shares, ""]);
    setError("");
  };

  const updatePerson = (index, value) => {
    const newPeople = [...people];
    newPeople[index] = value;
    setPeople(newPeople);
  };

  const deletePerson = (index) => {
    if (people.length > 1) {
      setPeople(people.filter((_, i) => i !== index));
      setAmounts(amounts.filter((_, i) => i !== index));
      setPercentages(percentages.filter((_, i) => i !== index));
      setShares(shares.filter((_, i) => i !== index));
      setError("");
    } else {
      setError("At least one participant is required.");
    }
  };

  const updateAmount = (index, value) => {
    const newAmounts = [...amounts];
    const cleanedValue = value === "" ? "" : value;
    newAmounts[index] = cleanedValue;

    const totalOtherAmounts = newAmounts.reduce((sum, amount, i) => {
      const num = parseFloat(amount);
      return sum + (isNaN(num) || i === index ? 0 : num);
    }, 0);

    const newValueNum = parseFloat(cleanedValue);
    if (!isNaN(newValueNum) && totalOtherAmounts + newValueNum > parseFloat(expense)) {
      setError("Total amounts cannot exceed the expense amount.");
    } else {
      setError("");
      setAmounts(newAmounts);
    }
  };

  const updatePercentage = (index, value) => {
    const newPercentages = [...percentages];
    newPercentages[index] = value;

    const totalPercentage = newPercentages.reduce(
      (sum, percentage) => sum + parseFloat(percentage || 0),
      0
    );

    if (totalPercentage > 100) {
      setError("Total percentages cannot exceed 100%.");
    } else {
      setError("");
      setPercentages(newPercentages);
    }
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
      const totalShares = shares.reduce(
        (sum, share) => sum + parseInt(share || 0, 10),
        0
      );
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
        <Box display="flex" justifyContent="center">
          <Box width="100%" maxWidth="900px">
            <Card
              sx={{
                background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
                boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.15)",
                borderRadius: 4,
                p: 4,
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

                {error && <Alert severity="error">{error}</Alert>}

                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Participants
                </Typography>

                {people.map((person, index) => (
                  <Box key={index} display="flex" gap={2} flexWrap="wrap" alignItems="center" mb={2}>
                    <TextField
                      label="Name"
                      type="text"
                      value={person}
                      onChange={(e) => updatePerson(index, e.target.value)}
                      variant="outlined"
                      sx={{ backgroundColor: "#ffffff", width: "400px" }}
                    />
                    {splitType === "unequal" && (
                      <TextField
                        label="Amount Paid"
                        type="text"
                        value={amounts[index]}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^\d*(\.\d{0,2})?$/.test(val)) {
                            updateAmount(index, val);
                          }
                        }}
                        variant="outlined"
                        sx={{ backgroundColor: "#ffffff", width: "160px" }}
                      />
                    )}
                    {splitType === "percentage" && (
                      <TextField
                        label="Percentage (%)"
                        type="text"
                        value={percentages[index]}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^\d*(\.\d{0,2})?$/.test(val)) {
                            updatePercentage(index, val);
                          }
                        }}
                        variant="outlined"
                        sx={{ backgroundColor: "#ffffff", width: "160px" }}
                      />
                    )}
                    {splitType === "shares" && (
                      <TextField
                      label="Shares"
                      type="text"
                      value={shares[index]}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val)) {
                          updateShares(index, val);
                        }
                      }}
                      variant="outlined"
                      sx={{ backgroundColor: "#ffffff", width: "160px" }}
                    />
                    
                    )}
                    <Button
                      color="error"
                      onClick={() => deletePerson(index)}
                      sx={{ minWidth: "36px", padding: "6px 10px" }}
                    >
                      <Delete />
                    </Button>
                  </Box>
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

                <Box mt={4}>
                  <Typography variant="h6" fontWeight="bold">
                    Split Results
                  </Typography>
                  {calculateSplit().map((result, index) => (
                    <Typography key={index} sx={{ mt: 1, fontSize: "1rem", color: "#333" }}>
                      {result.person || "Someone"} owes: <span style={{ fontWeight: "bold", color: "#f44336" }}>
                        ${result.amountOwed.toFixed(2)}
                      </span>
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
}
