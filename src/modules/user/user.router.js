import { Router } from "express";
import * as userController from "./controller/user.js";
import { validation } from "../../middleware/validation.middelware.js";
import { deleteUser } from "./user.validation.js";
const router = Router();
router.get("/", userController.users);
router.delete("/:_id", validation(deleteUser), userController.deleteUser);
export default router;
