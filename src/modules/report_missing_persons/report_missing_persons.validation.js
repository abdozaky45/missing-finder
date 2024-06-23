import joi from 'joi';
export const addMissingPerson = joi
  .object({
    label1: joi.string().required(),
    missingGender: joi.string().valid('Male', 'Female').required(),
    healthStatus: joi
      .string()
      .valid('healthy', 'sick', 'SpecialNeeds')
      .required(),
    age: joi.number().integer().min(1).max(100).required(),
    dateOfLoss: joi.date().required(),
    missingPersonClassification: joi
      .string()
      .valid('Lost', 'Kidnapped', 'Runaway', 'others')
      .required(),
    wherePersonLost: joi.string().required(),
    absenceReport: joi.string().valid('Yes', 'No', 'No clue').required(),
    birthMark: joi.string(),
    city: joi.string().required(),
    country: joi.string().required(),
    // Data of the reporting person
    phone: joi.string().min(0).max(11).required(),
    relationMissingPerson: joi
      .string()
      .valid(
        'first degree relative',
        'second degree relative',
        'third degree relative',
        'others'
      )
      .required(),
  })
  .required();

export const addFoundPerson = joi
  .object({
    label1: joi.string().required(),
    missingPersonInformation: joi
      .string()
      .valid(
        'The Person Himself Confirmed His Name',
        'Not sure of his/her identity'
      )
      .required(),
    foundPersonGender: joi.string().valid('Male', 'Female').required(),
    healthStatus: joi
      .string()
      .valid('healthy', 'sick', 'SpecialNeeds')
      .required(),
    age: joi.number().integer().min(1).max(100),
    city: joi.string().required(),
    country: joi.string().required(),
    address: joi.string().required(),
    absenceReport: joi.string().valid('Yes', 'No', 'No clue').required(),
    // Data of the reporting person
    phone: joi.string().min(0).max(11).required(),
  })
  .required();
export const showMoreCheckFace = joi.object({
  _id: joi.string().required()
})
  .required();
export const searchMissingAndFoundPersonsValidation = joi
  .object({
    page: joi.string().required(),
  })
  .required();
export const searchMissingAndFoundPersonsValidationWithName = joi
  .object({
    keyword: joi.string().required(),
    page: joi.string().required(),
  })
  .required();
export const searchMissingAndFoundPersonsValidationWithArea = joi
  .object({
    country: joi.string().required(),
    page: joi.string().required(),
  })
  .required();
export const searchMissingAndFoundPersonsValidationWithYear = joi
  .object({
    year: joi.string().required(),
    page: joi.string().required(),
  })
  .required();
export const getSingleMissingPersonAndFoundPerson = joi.object({
  reportId: joi.string().required()
}).required();
export const deleteMatching = joi.object({
  user_id: joi.string().required(),
  reporter_id: joi.string().required(),
}).required();
export const singleMatching = joi.object({
  userId: joi.string().required(),
}).required();
export const deleteCheckFace = joi.object({
  _id: joi.string().required(),
}).required();