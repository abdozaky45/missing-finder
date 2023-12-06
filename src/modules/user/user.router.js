import { Router } from "express";
import *as userController from "./controller/user.js";
const router = Router();
router.get("/",userController.users);
router.delete("/:_id",userController.deleteUser)
export default router;