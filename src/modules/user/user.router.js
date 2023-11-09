import { Router } from "express";
import *as userController from "./controller/user.js";
const router = Router();
router.post("/",userController.test);
export default router;