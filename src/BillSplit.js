import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  Box
} from "@mui/material";
import { AddCircle, Delete } from "@mui/icons-material";
import Tesseract from "tesseract.js";
import { motion } from "framer-motion";


export default function SplitBill() {
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [splitType, setSplitType] = useState("equal");
  const [receiptText, setReceiptText] = useState("");
  const [lineItems, setLineItems] = useState([]);
  const [owedAmounts, setOwedAmounts] = useState({});

  const handleFileUpload = (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;

    Tesseract.recognize(imageFile, "eng")
      .then(({ data: { text } }) => {
        setReceiptText(text);
        processLineItems(text);
      })
      .catch((err) => console.error("OCR Error:", err));
  };

  const processLineItems = (text) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    const detectedItems = lines.map((line) => ({
      item: line,
      price: extractPrice(line),
      assignedTo: "",
    }));
    setLineItems(detectedItems);
  };

  const extractPrice = (line) => {
    const match = line.match(/\d+(\.\d{2})?/);
    return match ? parseFloat(match[0]) : null;
  };

  const assignPersonToItem = (index) => {
    const updatedItems = [...lineItems];
    const currentIndex = people.indexOf(updatedItems[index].assignedTo);
  
    if (currentIndex === -1) {
      updatedItems[index].assignedTo = people[0];
    } else if (currentIndex === people.length - 1) {
      updatedItems[index].assignedTo = ""; 
    } else {
      updatedItems[index].assignedTo = people[currentIndex + 1];
    }
  
    setLineItems(updatedItems);
    calculateOwedAmounts(updatedItems);
  };
  

  const addPerson = () => {
    if (newPerson.trim() !== "" && !people.includes(newPerson)) {
      setPeople([...people, newPerson]);
      setNewPerson("");
    }
  };

  const removePerson = (personToRemove) => {
    const updatedPeople = people.filter((p) => p !== personToRemove);
    setPeople(updatedPeople);

    const updatedItems = lineItems.map((item) =>
      item.assignedTo === personToRemove ? { ...item, assignedTo: "" } : item
    );
    setLineItems(updatedItems);

    calculateOwedAmounts(updatedItems);
  };

  const calculateOwedAmounts = (items) => {
    const totals = {};
    items.forEach((item) => {
      if (item.assignedTo && item.price) {
        totals[item.assignedTo] = (totals[item.assignedTo] || 0) + item.price;
      }
    });
    setOwedAmounts(totals);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", p: 5, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
        <Box sx={{ width: "100%", maxWidth: "900px" }}>
          <Card sx={{ p: 4, background: "linear-gradient(135deg, #ffffff, #e3f2fd)", boxShadow: 3, borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" textAlign="center">Split an Expense</Typography>

              <Button variant="contained" component="label" sx={{ my: 2, fontWeight: "bold" }}>
                Upload Receipt
                <input type="file" hidden onChange={handleFileUpload} />
              </Button>

              {receiptText && (
                <>
                  <Typography variant="h6" fontWeight="bold">Extracted Receipt Text:</Typography>
                  <pre style={{ background: "#eef", padding: "10px", borderRadius: "5px" }}>{receiptText}</pre>
                </>
              )}

              <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Participants</Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter name"
                  value={newPerson}
                  onChange={(e) => setNewPerson(e.target.value)}
                  sx={{ flex: "1 1 60%" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircle />}
                  onClick={addPerson}
                  sx={{ flex: "1 1 35%", fontWeight: "bold", fontSize: "1.1rem", py: 1.5 }}
                >
                  Add
                </Button>
              </Box>

              {people.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                  {people.map((person, index) => (
                    <Card key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, width: "calc(33% - 10px)", minWidth: "200px" }}>
                      <Typography>{person}</Typography>
                      <IconButton color="error" onClick={() => removePerson(person)}>
                        <Delete />
                      </IconButton>
                    </Card>
                  ))}
                </Box>
              )}

              {lineItems.length > 0 && (
                <>
                  <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Detected Items (Tap to Assign)</Typography>
                  {lineItems.map((item, index) => (
                    <Box key={index} sx={{ display: "flex", gap: 2, flexWrap: "wrap", my: 1 }}>
                      <TextField fullWidth label="Item" value={item.item} disabled sx={{ flex: "1 1 50%" }} />
                      <TextField fullWidth label="Price" value={item.price || ""} disabled sx={{ flex: "1 1 20%" }} />
                      <Button
                        variant="contained"
                        onClick={() => assignPersonToItem(index)}
                        sx={{
                          flex: "1 1 25%",
                          fontWeight: "bold",
                          backgroundColor: item.assignedTo ? "primary.main" : "white",
                          color: item.assignedTo ? "white" : "black",
                          border: "1px solid",
                          borderColor: "primary.main",
                          "&:hover": {
                            backgroundColor: item.assignedTo ? "primary.dark" : "#f0f0f0",
                          },
                        }}
                      >
                        {item.assignedTo || "Tap to Assign"}
                      </Button>
                    </Box>
                  ))}
                </>
              )}

              {Object.keys(owedAmounts).length > 0 && (
                <>
                  <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>Amount Split</Typography>
                  {Object.entries(owedAmounts).map(([person, amount]) => (
                    <Typography key={person} variant="body1" sx={{ fontWeight: "bold" }}>
                      {person}: <span style={{ color: "red" }}>${amount.toFixed(2)}</span>
                    </Typography>
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </motion.div>
  );
}