import express from "express";
import {PostTimeTable, GetAllTimeTable,UpdateTimeTable,DeleteTimeTable} from "../Controllers/TimeTable.conroller.js";
const router = express.Router();
import {handleUpload,handleUploadPDF} from "../Middleware/ImageMiddleWare.js"


router.post("/uploadTimeTable", handleUploadPDF ,PostTimeTable);
router.put("/uploadTimeTable/:id", handleUploadPDF ,UpdateTimeTable);
router.get("/getTimeTable",GetAllTimeTable); 
router.delete("/deleteTimeTable/:id",DeleteTimeTable);




export default router;  