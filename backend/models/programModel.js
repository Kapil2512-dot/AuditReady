const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Program name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  framework: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Framework", // References the Framework model
    required: [true, "Framework is required"],
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client", // References the Client model
    required: [true, "Client is required"],
  },
}, { timestamps: true });

const Program = mongoose.model("Program", programSchema);
module.exports = Program;
