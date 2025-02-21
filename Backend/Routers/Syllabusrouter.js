import express from "express";
import {PostSyllabus, GetAllSyllabus,UpdateSyllabus,DeleteSyllabus} from "../Controllers/Syllabus.controller.js";
const router = express.Router();
import {handleUpload,handleUploadPDF} from "../Middleware/ImageMiddleWare.js"


router.post("/uploadSyllabus", handleUploadPDF ,PostSyllabus);
router.put("/uploadSyllabus/:id", handleUploadPDF ,UpdateSyllabus);
router.get("/getSyllabus",GetAllSyllabus); 
router.delete("/deleteSyllabus/:id",DeleteSyllabus);




export default router;      