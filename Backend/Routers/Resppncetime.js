import express from "express";
const router = express.Router();
import {handleUploadFile} from "../Middleware/ImageMiddleWare.js";
import {Postfile} from "../Controllers/rsponsectime.countroller.js";

router.post("/uploadfile", handleUploadFile , Postfile);




export default router;