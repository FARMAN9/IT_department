import express from "express";
const router = express.Router();
import {handleUpload} from "../Middleware/ImageMiddleWare.js";
import { PostMainImages, GetMainImages, DeleteMainImages,UpdateMainImages } from "../Controllers/MainImages.conroller.js";
import secureRouter from "../Middleware/secureRouter.js";


router.post("/uploadMainImages", handleUpload, PostMainImages);

router.get("/getMainImages",GetMainImages);
router.delete("/deleteMainImages/:id", DeleteMainImages);
router.put("/updateMainImages/:id", handleUpload, UpdateMainImages);



export default router;