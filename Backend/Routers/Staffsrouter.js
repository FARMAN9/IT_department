import express from "express";
import { PostStaffs, GetAllStaffs, UpdateStaffs, DeleteStaffs ,removeStaffsImage} from "../Controllers/Staffs.controller.js";
import {handleUpload} from "../Middleware/ImageMiddleWare.js";



const router = new express.Router();



router.post("/uploadStaffs", handleUpload ,PostStaffs);
router.get("/getStaffs", GetAllStaffs);
router.put("/updateStaffs/:id", handleUpload ,UpdateStaffs  );
router.delete("/deleteStaffs/:id", DeleteStaffs);
router.put("/removeStaffsImage/:id", removeStaffsImage);



export default router;