import express from "express";
import {puthodImage,getHodInfo,posthodInfo,removehodImage} from "../Controllers/Hod.controller.js";
const router = express.Router();
import {handleUpload} from "../Middleware/ImageMiddleWare.js"




router.put("/hodImage", handleUpload ,puthodImage);
router.get("/getHodInfo",getHodInfo);
router.put("/uplaodHodInfo", posthodInfo);
router.delete("/deleteHodImage/", removehodImage);





export default router;