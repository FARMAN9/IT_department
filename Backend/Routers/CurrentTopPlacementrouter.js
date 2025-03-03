import express from "express";
import { PostCurrentTopPlacements, GetAllCurrentTopPlacements, UpdateCurrentTopPlacements, DeleteCurrentTopPlacements ,removeCurrentTopPlacementsImage  } from "../Controllers/CurrentTopPlacement.controller.js";
import {handleUpload} from "../Middleware/ImageMiddleWare.js";



const router = new express.Router();



router.post("/uploadCurrentTopPlacements", handleUpload ,PostCurrentTopPlacements);
router.get("/getCurrentTopPlacements", GetAllCurrentTopPlacements);
router.put("/updateCurrentTopPlacements/:id", handleUpload ,UpdateCurrentTopPlacements  );
router.delete("/deleteCurrentTopPlacements/:id", DeleteCurrentTopPlacements);
router.put("/removeCurrentTopPlacementsImage/:id", removeCurrentTopPlacementsImage);



export default router;