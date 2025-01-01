import express from "express";
const router = express.Router();

import {GetMission,PostMission,UpdateMission,DeleteMission} from "../Controllers/Mission.conroller.js";



router.get("/missions", GetMission);
router.post("/missions", PostMission);
router.put("/missions/:id", UpdateMission);
router.delete("/missions/:id", DeleteMission);

export default router;