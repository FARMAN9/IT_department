import express from "express";
const router = express.Router();
import {handleUpload ,handleUploadPDF} from "../Middleware/ImageMiddleWare.js";
import {PostDepartmentsLabs,GetAllDepartmentsLabs,DeleteDepartmentsLabs,UpdateDepartmentsLabs,removeDepartmentsLabsImage,putLabManual,removeLabManual} from "../Controllers/DepartmentsLabs.controller.js";

router.post("/uploadDepartmentsLabs", handleUpload , PostDepartmentsLabs);
router.get("/getDepartmentsLabs",GetAllDepartmentsLabs);
router.delete("/deleteDepartmentsLabs/:id", DeleteDepartmentsLabs );
router.put("/updateDepartmentsLabs/:id", handleUpload, UpdateDepartmentsLabs);
router.put("/removeDepartmentsLabsImage/:id", removeDepartmentsLabsImage);

router.put("/putLabManual/:id", handleUploadPDF, putLabManual);
router.put("/removeLabManual/:id", removeLabManual);



export default router;