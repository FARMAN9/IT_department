import express from "express";
const app = express();
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import mongoose from "mongoose";
import  cors  from "cors";
import MainImagesRouter from "./Routers/MainImagesrouter.js";
import VissionRouter from "./Routers/Vissionrouter.js";
import MissionRouter from "./Routers/Missionrouter.js";


dotenv.config();
const PORT = process.env.PORT || 3000;
const URI = process.env.MongoDB_URI;


const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGODB_URI, {
          
      });
      console.log("MongoDB Connected");
  } catch (error) {
      console.error("MongoDB connection error:", error.message);
      process.exit(1);
  }
};

connectDB();

app.use(express.json());
app.use(cors({
  origin: "*", // Your frontend URL
  credentials: true
}));
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
        url: `http://localhost:${PORT}`,
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

app.use("/api", MainImagesRouter);
app.use("/api", VissionRouter);
app.use("/api", MissionRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
