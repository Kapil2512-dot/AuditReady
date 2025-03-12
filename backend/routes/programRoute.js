const express = require("express");
const mongoose = require("mongoose"); // <-- Missing import
const Program = require("../models/programModel");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, description, framework, client } = req.body;

        const newProgram = await Program.create({
            name,
            description,
            framework,
            client,
        });

        res.status(201).json(newProgram);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const programs = await Program.find()
            .populate("framework")
            .populate("client");
        res.json(programs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid program ID" });
    }

    try {
        const deleteProgram = await Program.findByIdAndDelete(id);

        if (!deleteProgram) {
            return res.status(404).json({ error: "Program not found" });
        }

        res.status(200).json({ message: "Program deleted successfully", deleteProgram });
    } catch (error) {
        console.error("Error deleting program:", error);
        res.status(500).json({ error: "Server error while deleting program" });
    }
});

module.exports = router;
