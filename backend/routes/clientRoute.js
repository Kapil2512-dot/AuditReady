const express = require("express");
const router = express.Router();
const Client = require("../models/clientModel");
const Program = require("../models/programModel");
const mongoose = require("mongoose");

// Create a new client
router.post("/", async (req, res) => {
  const { name, email } = req.body;

  // Input validation
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  // Validate email format
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(email)) {
  //   return res.status(400).json({ error: "Invalid email format" });
  // }

  try {
    // Check if email already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const clientData = await Client.create({ name, email });
    res.status(201).json({ message: "Client created successfully", clientData });
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(400).json({ error: error.message });
  }
});

// Get all clients
router.get("/", async (req, res) => {
  try {
    const allClients = await Client.find();
    res.status(200).json(allClients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(400).json({ error: error.message });
  }
});

// Get a single client by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleClient = await Client.findById(id);
    if (!singleClient) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json(singleClient);
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(400).json({ error: error.message });
  }
});

// Update a client
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updateClient = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateClient) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json({ message: "Client updated successfully", updateClient });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(400).json({ error: error.message });
  }
});

// Delete a client and its associated programs
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid client ID" });
  }

  try {
    // Delete all programs associated with the client
    await Program.deleteMany({ client: id });

    // Delete the client
    const deleteClient = await Client.findByIdAndDelete(id);

    if (!deleteClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json({ message: "Client and associated programs deleted successfully", deleteClient });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(400).json({ error: error.message });
  }
});



// Get all clients
router.get("/", async (req, res) => {
  try {
    const allClients = await Client.find();
    res.status(200).json(allClients);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// Get a single client by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleClient = await Client.findById(id);
    if (!singleClient) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json(singleClient);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// Update a client
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updateClient = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateClient) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json({ message: "Client updated successfully", updateClient });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// Delete a client and its associated programs
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid client ID" });
  }

  try {
    // Delete all programs associated with the client
    await Program.deleteMany({ client: id });

    // Delete the client
    const deleteClient = await Client.findByIdAndDelete(id);

    if (!deleteClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json({ message: "Client and associated programs deleted successfully", deleteClient });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
