import express from "express";
const router = express.Router();
import secureRouter from "../Middleware/secureRouter.js";
import {handleUpload} from "../Middleware/ImageMiddleWare.js";
import {PostGalleryImages,GetGalleryImages,DeleteGalleryImages,UpdateGalleryImages} from "../Controllers/Gallery.controller.js";

router.post("/uplaodGalleryImages", handleUpload , PostGalleryImages);
router.get("/getGalleryImages",GetGalleryImages);
router.delete("/deleteGalleryImages/:id", DeleteGalleryImages);
router.put("/updateGalleryImages/:id", handleUpload , UpdateGalleryImages);


export default router;