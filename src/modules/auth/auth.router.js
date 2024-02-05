import { Router } from "express";
import * as authController from "./controller/auth.js";
import { validation } from "../../middleware/validation.middelware.js";
import * as validator from "./auth.validation.js";
//import { fileObjects, fileUpload } from "../../utils/multer.js";
const router = Router();
// register
router.post(
  "/register",
  //fileUpload(fileObjects.image).single("personalIdCard"),
  validation(validator.registerSchema),
  authController.register
);
// Activate Account
router.post(
  "/activateAccount",
  validation(validator.activateAccountSchema),
  authController.activateAccount
);
// ReconfirmAccountActivation
router.post(
  "/ReconfirmAccountActivation",
  authController.ReconfirmAccountActivation
);
//Login
router.post("/login", validation(validator.loginSchema), authController.login);
// send forget password code email
router.post(
  "/forgetcode/email",
  validation(validator.forgetCodeEmailSchema),
  authController.sendForgetPasswordCodeEmail
);
//reconfirm ResetPassword email
router.patch(
  "/reconfirmResetPass/email",
  validation(validator.reconfirmResetPassEmailSchema),
  authController.ReconfirmResetPasswordEmail
);
// reset password email
router.patch(
  "/resetPass/email",
  validation(validator.resetPasswordEmailSchema),
  authController.resetPasswordEmail
);
// send forget password code phone
router.post(
  "/forgetcode/phone",
  validation(validator.forgetCodePhoneSchema),
  authController.sendForgetPasswordCodePhone
);
//reconfirm ResetPassword phone
router.patch(
  "/reconfirmResetPass/phone",
  validation(validator.reconfirmResetPassPhoneSchema),
  authController.ReconfirmResetPasswordPhone
);
// reset password phone
router.patch(
  "/resetPass/phone",
  validation(validator.resetPasswordPhoneSchema),
  authController.resetPasswordEmail
);



export default router;

