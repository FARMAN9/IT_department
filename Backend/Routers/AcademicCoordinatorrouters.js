import express from "express";
const router = express.Router();

import {PostAcademicCoordinators,GetAllAcademicCoordinators,UpdateAcademicCoordinator,DeleteAcademicCoordinator} from "../Controllers/AcademicCoordinators.controller.js";

router.post("/uploadAcademicCoordinators", PostAcademicCoordinators);
router.get("/getAcademicCoordinators",GetAllAcademicCoordinators);
router.put("/uploadAcademicCoordinators/:id", UpdateAcademicCoordinator);
router.delete("/deleteAcademicCoordinators/:id",DeleteAcademicCoordinator);


export default router;