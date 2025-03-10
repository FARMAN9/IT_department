import express from "express";
const router = express.Router();
import { handleUploadFile } from "../Middleware/ImageMiddleWare.js";
import {
  Postfile,
  PostfileGB,
  PostfileGB2,
} from "../Controllers/rsponsectime.countroller.js";

router.post("/uploadfile", handleUploadFile, Postfile);
router.post("/uploadfileGB", handleUploadFile, PostfileGB);
router.post("/uploadfileGB2", handleUploadFile, PostfileGB2);

export default router;
