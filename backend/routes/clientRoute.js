const express = require('express');
const router = express.Router();
const Client = require('../models/clientModel');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  const { name, email } = req.body;

  // Input validation
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    const clientData = await Client.create({ name, email });
    res.status(201).json(clientData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allClients = await Client.find();
    res.status(200).json(allClients);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid client ID" });
  }

  try {
    const deleteClient = await Client.findByIdAndDelete(id);

    if (!deleteClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json({ message: "Client deleted successfully", deleteClient });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const {name , email} = req.body;
  try {
    const updateClient = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateClient) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "client updated successfully", updateClient });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleClient = await Client.findById(id);
    if (!singleClient) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(singleClient);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
