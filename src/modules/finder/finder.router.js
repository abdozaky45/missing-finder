import { Router } from "express";
import *as finderController from "./controller/finder.js";
const router = Router();
router.post("/",finderController.addFinder)
export default router;
