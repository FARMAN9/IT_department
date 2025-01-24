import express from "express";
import {PostSyllabus, GetAllSyllabus,UpdateSyllabus,DeleteSyllabus} from "../Controllers/Syllabus.controller.js";
const router = express.Router();
import {handleUpload,handleUploadPDF} from "../Middleware/ImageMiddleWare.js"


router.post("/uplaodSyllabus", handleUploadPDF ,PostSyllabus);
router.put("/uplaodSyllabus/:id", handleUploadPDF ,UpdateSyllabus);
router.get("/getSyllabus",GetAllSyllabus); 
router.delete("/deleteSyllabus/:id",DeleteSyllabus);




export default router;      