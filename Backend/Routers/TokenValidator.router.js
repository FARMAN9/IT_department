import express from "express";
import {validateToken} from "../Controllers/UserControllers/TokenValidater.controller.js";
const router = express.Router();

router.post("/validateToken", validateToken);

export default router;