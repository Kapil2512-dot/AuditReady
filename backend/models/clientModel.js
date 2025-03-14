const mongoose = require("mongoose");
const Program = require("./programModel"); // Import Program model

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Middleware: Delete all programs associated with this client
clientSchema.pre("findOneAndDelete", async function (next) {
  const clientId = this.getQuery()._id;
  await Program.deleteMany({ client: clientId }); // Delete programs where client matches
  next();
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
