import express from "express";
const router = express.Router();

import {
    GetProjects,
    PostProjects,
    UpdateProjects,
    DeleteProjects,
} from "../Controllers/Project.controller.js";

router.get("/getProjects", GetProjects);
router.post("/uploadProjects", PostProjects);
router.put("/updateProjects/:id", UpdateProjects);
router.delete("/deleteProjects/:id", DeleteProjects);

export default router;