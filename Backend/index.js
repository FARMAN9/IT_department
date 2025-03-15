import express from "express";
const app = express();
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import MainImagesRouter from "./Routers/MainImagesrouter.js";
import VissionRouter from "./Routers/Vissionrouter.js";
import MissionRouter from "./Routers/Missionrouter.js";
import mainInfoRouter from "./Routers/Maininforouters.js";
import HodInfoRouter from "./Routers/Hodinforouter.js";
import connectToMongoDB from "./MongoDB/MongoDBConnect.js";
import GalleryRouter from "./Routers/Galleryrouter.js";
import SyllabusRouter from "./Routers/Syllabusrouter.js";
import AcademicCoordinatorRouter from "./Routers/AcademicCoordinatorrouters.js";
import TimeTableRouter from "./Routers/TimeTableRouter.js";
import DepartmentActivitesCalenderRouter from "./Routers/DepartmentActivitesCalendarrouter.js";
import StudentsRouter from "./Routers/Studentsrouter.js";
import Userrouter from "./Routers/Userrouter.js";
import PhdScholarsRouter from "./Routers/PhdScholarsrouter.js";
import StaffsRouter from "./Routers/Staffsrouter.js";
import CurrentTopPlacementsRouter from "./Routers/CurrentTopPlacementrouter.js";
import ResearchArearouter from "./Routers/ResearchArearouter.js";
import ResponseTimeRouter from "./Routers/Resppncetime.js";
import DepartmentsLabrouter from "./Routers/DepartmentsLabrouter.js";
import ProjectsRouter from "./Routers/Projectsrouter.js";
import ResearchLabsRouter from "./Routers/ResearchLabrouter.js";
import ActivitiesAndStudentsNotificationsrouters from "./Routers/ActivitiesAndStudentsNotificationsrouters.js";
import TokenValidatorRouter from "./Routers/TokenValidator.router.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const PORT = process.env.PORT || 3000;
const URI = process.env.MongoDB_URI;

app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
connectToMongoDB().catch((error) => console.log(error));

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
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
  res.status(200).json({
    welcome: "Welcome to Department of IT NIT API",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
  next();
});

app.use((req, res, next) => {
  req.uploadStartTime = process.hrtime.bigint();
  next();
});

app.use("/api", Userrouter);
app.use("/api", MainImagesRouter);
app.use("/api", VissionRouter);
app.use("/api", MissionRouter);
app.use("/api", mainInfoRouter);
app.use("/api", HodInfoRouter);
app.use("/api", GalleryRouter);
app.use("/api", SyllabusRouter);
app.use("/api", AcademicCoordinatorRouter);
app.use("/api", TimeTableRouter);
app.use("/api", DepartmentActivitesCalenderRouter);
app.use("/api", StudentsRouter);
app.use("/api", PhdScholarsRouter);
app.use("/api", StaffsRouter);
app.use("/api", CurrentTopPlacementsRouter);
app.use("/api", ResearchArearouter);
app.use("/api", ResponseTimeRouter);
app.use("/api", DepartmentsLabrouter);
app.use("/api", ProjectsRouter);
app.use("/api", ResearchLabsRouter);
app.use("/api", ActivitiesAndStudentsNotificationsrouters);
app.use("/api", TokenValidatorRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
