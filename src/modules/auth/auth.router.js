import { Router } from "express";
import * as authController from "./controller/auth.js";
import { validation } from "../../middleware/validation.middelware.js";
import * as validator from "./auth.validation.js";
import { fileObjects, fileUpload } from "../../utils/multer.js";
const router = Router();
// register
router.post(
  "/register",
  fileUpload(fileObjects.image).single("personalIdCard"),
  validation(validator.registerSchema),
  authController.register
);
// Activate Account
router.post(
  "/activateAccount",
  validation(validator.activateAccountSchema),
  authController.activateAccount
);
router.post(
  "/ReconfirmAccountActivation",
  authController.ReconfirmAccountActivation
);
// send forget password code
router.post(
  "/forgetcode",
  validation(validator.forgetCodeSchema),
  authController.sendForgetPasswordCode
);
// reset password
router.patch(
  "/resetPass",
  validation(validator.resetPasswordSchema),
  authController.resetPassword
);
//reconfirm ResetPassword
router.patch(
  "/reconfirmResetPass",
  validation(validator.reconfirmResetPassSchema),
  authController.ReconfirmResetPassword
);
//Login
router.post("/login", validation(validator.loginSchema), authController.login);
export default router;
