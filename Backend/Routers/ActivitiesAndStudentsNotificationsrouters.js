import { Router } from "express";
import { GetAllActivitiesAndStudentsNotifications, PostActivitiesAndStudentsNotifications, UpdateActivitiesAndStudentsNotifications, DeleteActivitiesAndStudentsNotifications } from "../Controllers/ActivitesAndStudentNotifications.controller.js";
import {handleUploadFile} from "../Middleware/ImageMiddleWare.js";

const router = Router();

router.get("/getActivitiesAndStudentsNotifications", GetAllActivitiesAndStudentsNotifications);
router.post("/uploadActivitiesAndStudentsNotifications",handleUploadFile, PostActivitiesAndStudentsNotifications);
router.put("/updateActivitiesAndStudentsNotifications/:id",handleUploadFile, UpdateActivitiesAndStudentsNotifications);
router.delete("/deleteActivitiesAndStudentsNotifications/:id", DeleteActivitiesAndStudentsNotifications);


export default router;