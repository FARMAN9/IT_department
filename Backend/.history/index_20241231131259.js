import express from "express";
const app = express();
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 3000;
const URI = process.env.MongoDB_URI;

try {
  mongoose.connect(URI).then(console.log("Connected to MongoDB"));
} catch (error) {
  console.log(error);
}

app.use(express.json());
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
        url: `http://localhost:`,
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
