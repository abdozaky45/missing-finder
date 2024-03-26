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
  '/check-fac',
  auth,
  autherized ('user'),
  report_missing_personsController.checkFaceMissingPerson
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
  report_missing_personsController.checkFaceFoundPerson
);
export default router;
