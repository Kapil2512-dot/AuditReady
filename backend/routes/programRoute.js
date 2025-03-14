const express = require("express");
const mongoose = require("mongoose"); // Ensure mongoose is imported
const Program = require("../models/programModel");
const router = express.Router();

// Create a new program
router.post("/", async (req, res) => {
    try {
        const { name, description, framework, client } = req.body;

        // Validate required fields
        if (!name || !description || !framework || !client) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Validate if framework and client IDs are valid ObjectIds
        if (
            !mongoose.Types.ObjectId.isValid(framework) ||
            !mongoose.Types.ObjectId.isValid(client)
        ) {
            return res.status(400).json({ error: "Invalid framework or client ID" });
        }

        // Create the new program
        const newProgram = await Program.create({
            name,
            description,
            framework,
            client,
        });

        // Populate the framework and client fields in the response
        const populatedProgram = await Program.findById(newProgram._id)
            .populate("framework", "name") // Populate only the "name" field of framework
            .populate("client", "name"); // Populate only the "name" field of client

        res.status(201).json(populatedProgram);
    } catch (error) {
        console.error("Error creating program:", error);
        res.status(500).json({ error: "Server error while creating program" });
    }
});

// Get all programs
router.get("/", async (req, res) => {
    try {
        // Fetch all programs and populate framework and client fields
        const programs = await Program.find()
            .populate("framework", "name") // Populate only the "name" field of framework
            .populate("client", "name"); // Populate only the "name" field of client

        res.status(200).json(programs);
    } catch (error) {
        console.error("Error fetching programs:", error);
        res.status(500).json({ error: "Server error while fetching programs" });
    }
});

// Delete a program by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid program ID" });
    }

    try {
        // Find and delete the program
        const deletedProgram = await Program.findByIdAndDelete(id);

        if (!deletedProgram) {
            return res.status(404).json({ error: "Program not found" });
        }

        res.status(200).json({ message: "Program deleted successfully", deletedProgram });
    } catch (error) {
        console.error("Error deleting program:", error);
        res.status(500).json({ error: "Server error while deleting program" });
    }
});

module.exports = router;