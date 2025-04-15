const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();


router.post("/", async (req, res) => {
    const { userId, type, amount, category, description } = req.body;
  
    console.log("Received data:", req.body); 
  
    if (!userId || !type || !amount || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      const transaction = new Transaction({ userId, type, amount, category, description });
      await transaction.save();
      res.status(201).json(transaction);
    } catch (err) {
      console.error("Server error:", err); 
      res.status(500).json({ message: "Server error." });
    }
  });
    

  router.get("/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
