const express = require('express')
const mongoose = require('mongoose')
const app = express();
const dotenv = require("dotenv");
const clientRoute = require('./routes/clientRoute')
const userRoute = require('./routes/userRoute')
dotenv.config();
const cors = require("cors");
app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected successfully");
    app.listen(process.env.PORT || 8000, () => {
      console.log("Running successfully at ", process.env.PORT || 8000);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

// ✅ Fix the route base path
app.use("/api/clients", clientRoute);
app.use("/api/login", userRoute);