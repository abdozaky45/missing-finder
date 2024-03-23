import joi from "joi";
export const addMissingPerson = joi
  .object({
    label: joi.string().required(),
    missingGender: joi.string().valid("Male", "Female").required(),
    healthStatus: joi
      .string()
      .valid("healthy", "sick", "SpecialNeeds")
      .required(),
    age: joi.number().integer().min(1).max(100).required(),
    dateOfLoss: joi.date().required(),
    missingPersonClassification: joi
      .string()
      .valid("Lost", "Kidnapped", "Runaway", "others")
      .required(),
    wherePersonLost: joi.string().required(),
    absenceReport: joi.string().valid("Yes", "No", "No clue").required(),
    birthMark: joi.string(),
    // Data of the reporting person
    personalId: joi.string().min(0).max(14).required(),
    phone: joi.string().min(0).max(11).required(),
    relationMissingPerson: joi
      .string()
      .valid(
        "first degree relative",
        "second degree relative",
        "third degree relative",
        "others"
      )
      .required(),
    governorateReporter: joi.string().required(),
    stateCountry: joi.string().required(),
    reporterAddress: joi.string().required()
  })
  .required();

