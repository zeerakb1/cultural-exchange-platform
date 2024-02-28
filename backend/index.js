const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const authRoute = require("./routes/auth");

dotenv.config();

// Middlewares
app.use(express.json());
app.use("/api/auth", authRoute);

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is connected successfully!");
  } catch (err) {
    console.log(err);
  }
};

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`App is running on port ${process.env.PORT}`);
});