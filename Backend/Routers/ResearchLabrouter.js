import express from "express";
const router = express.Router();
import {
  handleUpload,
  handleUploadPDF,
} from "../Middleware/ImageMiddleWare.js";
import {
  PostResearchLabs,
  GetAllResearchLabs,
  DeleteResearchLabs,
  UpdateResearchLabs,
  removeResearchLabsImage,
  putResearchLabsManual,
  removeResearchLabsManual,
} from "../Controllers/ResearchLabs.controller.js";

router.post("/uploadResearchLabs", handleUpload, PostResearchLabs);
router.get("/getResearchLabs", GetAllResearchLabs);
router.delete("/deleteResearchLabs/:id", DeleteResearchLabs);
router.put("/updateResearchLabs/:id", handleUpload, UpdateResearchLabs);
router.put("/removeResearchLabsImage/:id", removeResearchLabsImage);

router.put(
  "/uploadResearchLabsManual/:id",
  handleUploadPDF,
  putResearchLabsManual
);
router.put("/removeResearchLabsManual/:id", removeResearchLabsManual);

export default router;
