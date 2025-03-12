const express = require('express')
const mongoose = require('mongoose')
const app = express();
const dotenv = require("dotenv");
const clientRoute = require('./routes/clientRoute')
const userRoute = require('./routes/userRoute')
const frameRoute = require('./routes/frameRoute')
const programRoute = require('./routes/programRoute')
dotenv.config();
const cors = require("cors");
app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected successfully");
    app.listen(process.env.PORT || 9000, () => {
      console.log("Running successfully at ", process.env.PORT || 9000);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

app.use("/api/clients", clientRoute);
app.use("/api/login", userRoute);
app.use("/api/frameworks",frameRoute);
app.use("/api/programs",programRoute)
