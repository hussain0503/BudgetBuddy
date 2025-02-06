const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = "mongodb://localhost:27017/myReactApp";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected to MyReactApp"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mongoose Schema and Model for Users
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, // Storing password as plain text
});

const User = mongoose.model("User", userSchema);

// Signup Route
app.post("/api/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create a new user with plain-text password (not recommended for production)
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Debugging: Log both passwords to check if there are any discrepancies
    console.log("User input password:", password);
    console.log("Stored password:", user.password);

    // Compare passwords (trim both inputs to avoid whitespace issues)
    if (user.password.trim() !== password.trim()) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});



// Server Setup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
