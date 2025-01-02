import express from "express";
import { postMainInfo, getMainInfoById, putImage } from "../Controllers/MainINFO.conroller.js";
const router = express.Router();
import {handleUpload} from "../Middleware/ImageMiddleWare.js"


router.put("/uplaodMainInfo", postMainInfo);
router.put("/putImage/", handleUpload ,putImage);
router.get("/getMainInfo/",getMainInfoById);




export default router;