import express from "express";
import {UplaodActivitesCalender,GetActivitesCalender} from "../Controllers/DepartmentActivitesCalender.conroller.js"
const router = express.Router();
import {handleUpload,handleUploadPDF} from "../Middleware/ImageMiddleWare.js"


router.post("/uplaodActivitesCalender", handleUploadPDF ,UplaodActivitesCalender);
router.get("/getActivitesCalender",GetActivitesCalender); 





export default router;      