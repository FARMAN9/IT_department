import express from "express";
const router = express.Router();
import {handleUpload} from "../Middleware/ImageMiddleWare.js";
import {PostResearchAreas,GetAllResearchAreas,DeleteResearchAreas,UpdateResearchAreas,removeResearchAreasImage} from "../Controllers/ResearchAreas.controller.js";

router.post("/uploadResearchAreas", handleUpload , PostResearchAreas);
router.get("/getResearchAreas",GetAllResearchAreas);
router.delete("/deleteResearchAreas/:id", DeleteResearchAreas );
router.put("/updateResearchAreas/:id", handleUpload, UpdateResearchAreas);
router.put("/removeResearchAreasImage/:id", removeResearchAreasImage);



export default router;