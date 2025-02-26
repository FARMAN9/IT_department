import express from "express";
import {UplaodActivitesCalender,GetActivitesCalender,DeleteActivitesCalender} from "../Controllers/DepartmentActivitesCalender.conroller.js"
const router = express.Router();
import {handleUpload,handleUploadPDF} from "../Middleware/ImageMiddleWare.js"


router.post("/uploadActivitesCalender", handleUploadPDF ,UplaodActivitesCalender);
router.get("/getActivitesCalender", GetActivitesCalender); 
router.delete("/deleteActivitesCalender",DeleteActivitesCalender);




export default router;      