import { Router } from "express";
import *as report_missing_persons from "./controller/report_missing_persons.js";
const router = Router();
router.post("/",report_missing_persons.addFinder)
export default router;
