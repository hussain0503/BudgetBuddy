import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
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
    if (people.length === 0) return;
    const updatedItems = [...lineItems];
    const currentIndex = people.indexOf(updatedItems[index].assignedTo);
    const nextPerson = currentIndex === -1 ? people[0] : people[(currentIndex + 1) % people.length];

    updatedItems[index].assignedTo = nextPerson;
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
    <Grid container justifyContent="center" sx={{ padding: "40px", backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <Grid item xs={12} md={10} lg={8}>
        <Card sx={{ p: 4, background: "linear-gradient(135deg, #ffffff, #e3f2fd)", boxShadow: "0px 6px 14px rgba(0,0,0,0.15)", borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" textAlign="center">Split an Expense</Typography>


            <Button variant="contained" component="label"  sx={{ my: 2,fontWeight: "bold", }}>
              Upload Receipt
              <input type="file" hidden onChange={handleFileUpload} sx={{fontWeight: "bold" }} />
            </Button>

            {receiptText && (
              <>
                <Typography variant="h6" fontWeight="bold">Extracted Receipt Text:</Typography>
                <pre style={{ background: "#eef", padding: "10px", borderRadius: "5px" }}>{receiptText}</pre>
              </>
            )}


            <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Participants</Typography>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter name"
                  value={newPerson}
                  onChange={(e) => setNewPerson(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
              <Button
  variant="contained"
  color="primary"
  fullWidth
  startIcon={<AddCircle />}
  onClick={addPerson}
  sx={{
    py: 1.5, 
    fontSize: "1.1rem",
    fontWeight: "bold", 
  }}
>
  Add
</Button>

              </Grid>
            </Grid>

            {people.length > 0 && (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {people.map((person, index) => (
                  <Grid item key={index} xs={6} sm={4}>
                    <Card sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1.5 }}>
                      <Typography>{person}</Typography>
                      <IconButton color="error" onClick={() => removePerson(person)}>
                        <Delete />
                      </IconButton>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}


            {lineItems.length > 0 && (
              <>
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Detected Items (Tap to Assign)</Typography>
                {lineItems.map((item, index) => (
                 <Grid container spacing={2} key={index} sx={{ my: 1 }}>
                 <Grid item xs={6}>
                   <TextField fullWidth variant="outlined" label="Item" value={item.item} disabled />
                 </Grid>
                 <Grid item xs={3}>
                   <TextField fullWidth variant="outlined" label="Price" value={item.price || ""} disabled />
                 </Grid>
                 <Grid item xs={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <Button
                     variant="contained"
                     fullWidth
                     onClick={() => assignPersonToItem(index)}
                     sx={{
                       height: "100%",
                       textTransform: "none",
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
                 </Grid>
               </Grid>               
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
      </Grid>
    </Grid>
    </motion.div>
  );
}