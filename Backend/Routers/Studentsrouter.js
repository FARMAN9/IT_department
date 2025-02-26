import express from "express";
import {PostStudents, GetAllStudents,UpdateStudents,DeleteStudents} from "../Controllers/Students.controller.js";
const router = express.Router();
import {handleUpload,handleUploadPDF} from "../Middleware/ImageMiddleWare.js"


router.post("/uploadStudents", handleUploadPDF ,PostStudents);
router.put("/uploadStudents/:id", handleUploadPDF ,UpdateStudents);
router.get("/getStudents",GetAllStudents); 
router.delete("/deleteStudents/:id",DeleteStudents);




export default router;      