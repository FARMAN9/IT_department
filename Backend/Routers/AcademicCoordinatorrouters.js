import express from "express";
const router = express.Router();

import {PostAcademicCoordinators,GetAllAcademicCoordinators,UpdateAcademicCoordinator,DeleteAcademicCoordinator} from "../Controllers/AcademicCoordinators.controller.js";

router.post("/uplaodAcademicCoordinators", PostAcademicCoordinators);
router.get("/getAcademicCoordinators",GetAllAcademicCoordinators);
router.put("/uplaodAcademicCoordinators/:id", UpdateAcademicCoordinator);
router.delete("/deleteAcademicCoordinators/:id",DeleteAcademicCoordinator);


export default router;