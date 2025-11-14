// src/app.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("./routes/user.routes");
const messageRoutes = require("./routes/message.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Welcome to WhatsApp Backend API 🚀");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

module.exports = app;
