import { Router } from "express";
import *as finderController from "./controller/report_missing_persons.js";
const router = Router();
router.post("/",finderController.addFinder)
export default router;
