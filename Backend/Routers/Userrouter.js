import express from "express";
const router = express.Router();
import { handleUpload, handleUploadPDF } from "../Middleware/ImageMiddleWare.js"
import {signIn, signUpForUsers, signUpForAdmin } from "../Controllers/UserControllers/User.controller.js"


router.post("/signIn", signIn);
router.post("/signUpForUsers", handleUpload , signUpForUsers);
router.post("/signUpForAdmin", handleUpload , signUpForAdmin);




export default router; 