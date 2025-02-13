import express from "express";
const router = express.Router();
import {handleUpload} from "../Middleware/ImageMiddleWare.js";
import { PostMainImages, GetMainImages, DeleteMainImages } from "../Controllers/MainImages.conroller.js";
import secureRouter from "../Middleware/secureRouter.js";


router.post("/uplaodMainImages", handleUpload,secureRouter, PostMainImages);

router.get("/getMainImages",GetMainImages);
router.delete("/deleteMainImages/:id",DeleteMainImages);



export default router;