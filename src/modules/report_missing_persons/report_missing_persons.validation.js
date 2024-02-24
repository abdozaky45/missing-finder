import joi from "joi";
export const addFinder = joi
  .object({
    fullNameFinder: joi.string().min(3).max(50).required(),
    finderGender: joi.string().valid("Male", "Female").required(),
    HealthStatus: joi
      .string()
      .valid("healthy", "sick", "SpecialNeeds")
      .required(),
    Age: joi.string().min(1).max(2).required(),
    DateOfLoss: joi.date().required(),
    MissingPersonClassification: joi
      .string()
      .valid("Lost", "Kidnapped", "Runaway", "others")
      .required(),
    WherePersonLost: joi.string().required(),
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
    ReporterAddress: joi.string().required()
  })
  .required();
