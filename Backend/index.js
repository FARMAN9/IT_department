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
import mainInfoRouter from "./Routers/Maininforouters.js";
import connectToMongoDB from "./MongoDB/MongoDBConnect.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const URI = process.env.MongoDB_URI;

app.use(express.json());

connectToMongoDB();


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
app.use("/api", mainInfoRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});
