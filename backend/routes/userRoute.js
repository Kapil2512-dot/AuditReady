const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Register
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Account (Requires Auth)
router.delete("/delete", authenticateUser, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.userId);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Failed to delete account" });
  }
});

// Update Credentials (Requires Auth)
// Update Name & Email (Requires Auth)
router.put("/update", authenticateUser, async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email are required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId, // Use authenticated user's ID
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
