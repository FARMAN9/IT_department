import express from "express";
const router = express.Router();
import {handleUpload} from "../Middleware/ImageMiddleWare.js";
import  {PostMainImages,GetMainImages,DeleteMainImages}  from "../Controllers/MainImages.conroller.js";


router.post("/uplaodMainImages", handleUpload , PostMainImages);
router.get("/getMainImages",GetMainImages);
router.delete("/deleteMainImages/:id",DeleteMainImages);



export default router;