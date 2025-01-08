import express from "express";
const router = express.Router();
import {handleUpload} from "../Middleware/ImageMiddleWare.js";
import {PostGalleryImages,GetGalleryImages,DeleteGalleryImages} from "../Controllers/Gallery.controller.js";

router.post("/uplaodGalleryImages", handleUpload , PostGalleryImages);
router.get("/getGalleryImages",GetGalleryImages);
router.delete("/deleteGalleryImages/:id",DeleteGalleryImages);

export default router;