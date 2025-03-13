import express from "express";
const router = express.Router();
import {handleUpload} from "../Middleware/ImageMiddleWare.js";
import {PostPhdscholars,GetPhdscholars,DeletePhdscholars,UpdatePhdscholars,removePhdscholarsImage} from "../Controllers/PhdScholars.controller.js";

router.post("/uploadPhdScholars", handleUpload , PostPhdscholars);
router.get("/getPhdScholars",GetPhdscholars);
router.delete("/deletePhdScholars/:id", DeletePhdscholars );
router.put("/updatePhdScholars/:id", handleUpload, UpdatePhdscholars);
router.put("/removePhdscholarsImage/:id", removePhdscholarsImage);
//update phd scholars


export default router;