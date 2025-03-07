import express from "express";
const router = express.Router();
import secureRouter from "../Middleware/secureRouter.js";
import {handleUpload} from "../Middleware/ImageMiddleWare.js";
import {PostGalleryImages,GetGalleryImages,DeleteGalleryImages,UpdateGalleryImages} from "../Controllers/Gallery.controller.js";

router.post("/uplaodGalleryImages",secureRouter, handleUpload , PostGalleryImages);
router.get("/getGalleryImages",GetGalleryImages);
router.delete("/deleteGalleryImages/:id",secureRouter,DeleteGalleryImages);
router.put("/updateGalleryImages/:id",secureRouter, handleUpload , UpdateGalleryImages);


export default router;