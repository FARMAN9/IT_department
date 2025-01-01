import express from "express";
const router = express.Router();

import {
    GetVision,
    PostVision,
    UpdateVision,
    DeleteVision,
} from "../Controllers/Vission.controller.js";

router.get("/visions", GetVision);
router.post("/visions", PostVision);
router.put("/visions/:id", UpdateVision);
router.delete("/visions/:id", DeleteVision);

export default router;