const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const User = require("./models/userModel");
const userRoutes = require("./routes/userRoutes");
const cors=require("cors")
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/", userRoutes);

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Database Connected!");
    app.listen(process.env.PORT, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });
