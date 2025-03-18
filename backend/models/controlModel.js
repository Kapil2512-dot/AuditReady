const mongoose = require("mongoose");

const controlSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  framework: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Framework", 
    required: true 
  },
});

module.exports = mongoose.model("Control", controlSchema);
