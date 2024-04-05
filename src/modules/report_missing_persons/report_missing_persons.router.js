import { Router } from 'express';
import * as report_missing_personsController
  from './controller/report_missing_persons.js';
import { auth } from '../../middleware/authentication .middleware.js';
import { autherized } from '../../middleware/authorization.middleware.js';
import { validation } from '../../middleware/validation.middelware.js';
import * as validator from './report_missing_persons.validation.js';
const router = Router();
router.post(
  '/addFinder',
  auth,
  autherized('user'),
  validation(validator.addMissingPerson),
  report_missing_personsController.addMissingFinder
);
router.post(
  '/addFound',
  auth,
  autherized('user'),
  validation(validator.addFoundPerson),
  report_missing_personsController.addFoundPerson
);
router.post(
  '/foundPersons/check-fac',
  auth,
  autherized('user'),
  report_missing_personsController.checkFaceMissingPerson
);
router.delete("/deleteReport/:_id", report_missing_personsController.deleteReport);
router.get(
  '/getAllMissingPersons',
  validation(validator.searchMissingAndFoundPersonsValidation),
  report_missing_personsController.getAllMissingPersons
);
router.get(
  '/getAllFoundPersons',
  validation(validator.searchMissingAndFoundPersonsValidation),
  report_missing_personsController.getAllFoundPersons
);
router.get(
  '/all',
  validation(validator.searchMissingAndFoundPersonsValidationWithName),
  report_missing_personsController.searchMissingPersonsWithName
);
router.get(
  '/foundPersons/all',
  validation(validator.searchMissingAndFoundPersonsValidationWithName),
  report_missing_personsController.searchFoundPersonsWithName
);
router.get(
  '/getAllMissingPersonsWithArea',
  validation(validator.searchMissingAndFoundPersonsValidationWithArea),
  report_missing_personsController.searchMissingPersonsWithArea
);
router.get(
  '/getAllFoundPersonsWithArea',
  validation(validator.searchMissingAndFoundPersonsValidationWithArea),
  report_missing_personsController.searchFoundPersonsWithArea
);
router.get(
  '/getAllMissingPersonsWithYear',
  validation(validator.searchMissingAndFoundPersonsValidationWithYear),
  report_missing_personsController.searchMissingPersonsWithMissingSince
);
router.get(
  '/getAllFoundPersonsWithYear',
  validation(validator.searchMissingAndFoundPersonsValidationWithYear),
  report_missing_personsController.searchFoundPersonsWithMissingSince
);
export default router;
