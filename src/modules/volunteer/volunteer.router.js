import { Router } from "express";
import * as volunteerController from "./controller/volunteer.js";
import { auth } from "../../middleware/authentication .middleware.js";
import { fileObjects, upload } from "../../utils/multer.js";
import { autherized } from "../../middleware/authorization.middleware.js";
const router = Router();
router.post(
  "/",
  auth,
  autherized("user"),
  upload({
    folder: "users/foundPersons",
    filetype: fileObjects.image
  }).single("ImageFoundPerson"),
  volunteerController.addFoundPerson
);
export default router;
