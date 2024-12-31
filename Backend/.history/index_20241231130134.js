require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
