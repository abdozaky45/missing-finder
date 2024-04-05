import { Router } from "express";
import * as userController from "./controller/user.js";
import { auth } from "../../middleware/authentication .middleware.js";
import { autherized } from "../../middleware/authorization.middleware.js";
import { validation } from "../../middleware/validation.middelware.js";
import *as validator from "./user.validation.js";
const router = Router();
router.get("/", userController.users);
router.delete("/:_id", userController.deleteUser);
router.patch(
    '/changePass',
    auth,
    autherized('user'),
    validation(validator.changePassword),
    userController.changePassword
);
router.patch(
    '/sendCodeDeleteAccount',
    auth,
    autherized('user'),
    validation(validator.sendCodeDeleteAccount),
    userController.sendCodeDeleteAccount
);
router.post(
    '/deleteAccount',
    auth,
    autherized('user'),
    validation(validator.deleteAccount),
    userController.deleteAccount
);
router.patch(
    '/resendCodeDeleteAccount',
    auth,
    autherized('user'),
    userController.resendSendCodeDeleteAccount
);
export default router;
