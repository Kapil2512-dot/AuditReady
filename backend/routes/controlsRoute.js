const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Control = require("../models/controlModel");
const Framework = require("../models/frameworkModel");

// ✅ Get all controls
router.get("/", async (req, res) => {
  try {
    const controls = await Control.find().populate("framework");
    res.status(200).json(controls);
  } catch (error) {
    res.status(500).json({ error: "Error fetching controls" });
  }
});

// ✅ Get controls for a specific framework
router.get("/framework/:frameworkId", async (req, res) => {
  try {
    const { frameworkId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(frameworkId)) {
      return res.status(400).json({ error: "Invalid framework ID" });
    }

    const controls = await Control.find({ framework: frameworkId });
    res.status(200).json(controls);
  } catch (error) {
    res.status(500).json({ error: "Error fetching framework controls" });
  }
});

// ✅ Add a control to a framework
router.post("/", async (req, res) => {
  try {
    const { name, description, frameworkId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(frameworkId)) {
      return res.status(400).json({ error: "Invalid framework ID" });
    }

    // Create new control
    const newControl = new Control({ name, description, framework: frameworkId });
    await newControl.save();

    // Update framework's control count
    await Framework.findByIdAndUpdate(frameworkId, {
      $inc: { controlsCount: 1 }
    });

    res.status(201).json(newControl);
  } catch (error) {
    res.status(500).json({ error: "Error adding control" });
  }
});

// ✅ Delete a control
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid control ID" });
    }

    const control = await Control.findByIdAndDelete(id);
    if (!control) {
      return res.status(404).json({ error: "Control not found" });
    }

    // Decrease control count in framework
    await Framework.findByIdAndUpdate(control.framework, {
      $inc: { controlsCount: -1 }
    });

    res.status(200).json({ message: "Control deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting control" });
  }
});

module.exports = router;
