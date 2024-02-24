import { Router } from "express";
import * as volunteerController from "./controller/volunteer.js";
import { auth } from "../../middleware/authentication .middleware.js";
import { fileObjects, upload } from "../../utils/multer.js";
import { autherized } from "../../middleware/authorization.middleware.js";
import { validation } from "../../middleware/validation.middelware.js";
import * as validator from "./volunteer.validation.js";
const router = Router();
router.post(
  "/",
  auth,
  autherized("user"),
  upload({
    folder: "users/foundPersons",
    filetype: fileObjects.image
  }).single("imageFoundPerson"),
  validation(validator.addFoundPerson),
  volunteerController.addFoundPerson
);
export default router;
