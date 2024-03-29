import {Router} from 'express';
import * as report_missing_personsController
  from './controller/report_missing_persons.js';
import {auth} from '../../middleware/authentication .middleware.js';
import {autherized} from '../../middleware/authorization.middleware.js';
import {validation} from '../../middleware/validation.middelware.js';
import * as validator from './report_missing_persons.validation.js';
const router = Router ();
router.post (
  '/addFinder',
  auth,
  autherized ('user'),
  validation (validator.addMissingPerson),
  report_missing_personsController.addMissingFinder
);
router.post (
  '/addFound',
  auth,
  autherized ('user'),
  validation (validator.addFoundPerson),
  report_missing_personsController.addFoundPerson
);
router.post (
  '/foundPersons/check-fac',
  auth,
  autherized ('user'),
  report_missing_personsController.checkFaceMissingPerson
);
router.post (
  '/getAllMissingPersons',
  auth,
  autherized ('user'),
  validation (validator.searchMissingAndFoundPersonsValidation),
  report_missing_personsController.getAllMissingPersons
);
router.post (
  '/getAllFoundPersons',
  auth,
  autherized ('user'),
  validation (validator.searchMissingAndFoundPersonsValidation),
  report_missing_personsController.getAllFoundPersons
);
router.post (
  '/all',
  auth,
  autherized ('user'),
  validation (validator.searchMissingAndFoundPersonsValidationWithName),
  report_missing_personsController.searchMissingPersonsWithName
);
router.post (
  '/foundPersons/all',
  auth,
  autherized ('user'),
  validation (validator.searchMissingAndFoundPersonsValidationWithName),
  report_missing_personsController.searchFoundPersonsWithName
);
router.post (
  '/getAllMissingPersonsWithArea',
  auth,
  autherized ('user'),
  validation (validator.searchMissingAndFoundPersonsValidationWithArea),
  report_missing_personsController.searchMissingPersonsWithArea
);
router.post (
  '/getAllFoundPersonsWithArea',
  auth,
  autherized ('user'),
  validation (validator.searchMissingAndFoundPersonsValidationWithArea),
  report_missing_personsController.searchFoundPersonsWithArea
);
router.post (
  '/getAllMissingPersonsWithYear',
  auth,
  autherized ('user'),
  validation (validator.searchMissingAndFoundPersonsValidationWithYear),
  report_missing_personsController.searchMissingPersonsWithMissingSince
);
router.post (
  '/getAllFoundPersonsWithYear',
  auth,
  autherized ('user'),
  validation (validator.searchMissingAndFoundPersonsValidationWithYear),
  report_missing_personsController.searchFoundPersonsWithMissingSince
);
export default router;
