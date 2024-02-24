import { Router } from "express";
import * as report_missing_personsController from "./controller/report_missing_persons.js";
import { auth } from "../../middleware/authentication .middleware.js";
import { fileObjects, upload } from "../../utils/multer.js";
import { autherized } from "../../middleware/authorization.middleware.js";
import { validation } from "../../middleware/validation.middelware.js";
import * as validator from "./report_missing_persons.validation.js";
const router = Router();
router.post(
  "/",
  auth,
  autherized("user"),
  upload({
    folder: "users/missingPersons",
    filetype: fileObjects.image
  }).single("finderImage"),
  validation(validator.addFinder),
  report_missing_personsController.addFinder
);
export default router;
