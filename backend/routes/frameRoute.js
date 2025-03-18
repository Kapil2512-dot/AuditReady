const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Framework = require("../models/frameworkModel");

// ✅ Get all frameworks with control count
router.get("/", async (req, res) => {
  try {
    const frameworks = await Framework.find().populate("controlsCount");
    res.status(200).json(frameworks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching frameworks" });
  }
});

// ✅ Get a single framework by ID
router.get("/:id", async (req, res) => {
  try {
    const framework = await Framework.findById(req.params.id).populate("controlsCount");
    if (!framework) {
      return res.status(404).json({ error: "Framework not found" });
    }
    res.json(framework);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
async function getFrameworksWithControlCount() {
  const frameworks = await Framework.find().populate("controlsCount");
  console.log(frameworks);
}

getFrameworksWithControlCount();

// ✅ Add multiple frameworks at once
router.post("/", async (req, res) => {
  const frameworks = req.body; // Expecting an array of objects
  try {
    const insertedFrameworks = await Framework.insertMany(frameworks);
    res.status(201).json(insertedFrameworks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete a framework by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid framework ID" });
  }

  try {
    const deletedFramework = await Framework.findByIdAndDelete(id);
    if (!deletedFramework) {
      return res.status(404).json({ error: "Framework not found" });
    }
    res.status(200).json({ message: "Framework deleted successfully", deletedFramework });
  } catch (error) {
    res.status(500).json({ error: "Error deleting framework" });
  }
});

module.exports = router;
