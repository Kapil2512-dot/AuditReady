const express = require('express');
const mongoose = require('mongoose');
const router = express.Router(); // Use express.Router() instead of express()
const Framework = require('../models/framworkModel');

router.post('/', async (req, res) => {
    const frameworks = req.body; // Expecting an array of objects
    try {
        const insertedFrameworks = await Framework.insertMany(frameworks);
        res.status(201).json(insertedFrameworks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/',async (req,res) => {
    const allFrameworks = await Framework.find();
    try {
        res.status(200).json(allFrameworks);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
router.get("/:id", async (req, res) => {
  try {
    const framework = await Framework.findById(req.params.id);
    if (!framework) {
      return res.status(404).json({ error: "Framework not found" });
    }
    res.json(framework);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid client ID" });
  }

  try {
    const deletedClient = await Framework.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json({ message: "Client deleted successfully", deletedClient });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; // Export the router to use in other files
