import express from "express";
import { postMainInfo, getMainInfoById, putImage ,removeMainImage} from "../Controllers/MainINFO.conroller.js";
const router = express.Router();
import {handleUpload} from "../Middleware/ImageMiddleWare.js"


router.put("/uplaodMainInfo", postMainInfo);
router.put("/updateMainDepartmentImage", handleUpload ,putImage);
router.get("/getMainInfo", getMainInfoById);
router.delete("/deleteMainDepartmentImage/", removeMainImage);




export default router; 