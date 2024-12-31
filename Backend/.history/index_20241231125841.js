import express from "express"
const app = express();
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Department of IT NIT API",
      version: "1.0.0",
      description: "API documentation for Department of IT NIT",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./index.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Define a route
app.get("/", (req, res) => {
  res.send("Department of it nit");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
