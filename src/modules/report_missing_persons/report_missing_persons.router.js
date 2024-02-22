import { Router } from "express";
import * as report_missing_persons from "./controller/report_missing_persons.js";
import { auth } from "../../middleware/authentication .middleware.js";
import { fileObjects, upload } from "../../utils/multer.js";
import { autherized } from "../../middleware/authorization.middleware.js";
const router = Router();
router.post(
  "/",
  auth,
  autherized("user"),
  upload({
    folder: "users/missingPersons",
    filetype: fileObjects.image
  }).single("finderImage"),
  report_missing_persons.addFinder
);
export default router;
