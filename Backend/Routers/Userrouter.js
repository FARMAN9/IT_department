import express from "express";
const router = express.Router();
import { handleUpload, handleUploadPDF } from "../Middleware/ImageMiddleWare.js"
import secureRouter from "../Middleware/secureRouter.js";
import {signIn, signUpForUsers, signUpForAdmin ,logout,getFaculty,getAdmin,currentUser} from "../Controllers/UserControllers/User.controller.js"


router.post("/signIn", signIn);
router.post("/signUpForUsers", handleUpload , signUpForUsers);
router.post("/signUpForAdmin", handleUpload, signUpForAdmin);

router.post("/logout", logout);

router.get("/getFaculty", getFaculty);
router.get("/getAdmin", getAdmin);
router.get("/currentUser/:id", secureRouter, currentUser);



export default router; 