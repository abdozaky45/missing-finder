import joi from "joi";
export const addMissingPerson = joi
  .object({
    label1: joi.string().required(),
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

  export const addFoundPerson = joi
    .object({
      label1: joi.string().min(3).max(50).required(),
      missingPersonInformation: joi
        .string()
        .valid(
          "The Person Himself Confirmed His Name",
          "Not sure of his/her identity",
          "Don't Know"
        )
        .required(),
      foundPersonGender: joi.string().valid("Male", "Female").required(),
      healthStatus: joi
        .string()
        .valid("healthy", "sick", "SpecialNeeds")
        .required(),
      age: joi.number().integer().min(1).max(100),
      metMissingPerson: joi.string().required(),
      governorateFoundPerson: joi.string().required(),
      stateCountryFoundPerson: joi.string().required(),
      addressFoundPerson: joi.string().required(),
      missingClothes: joi.string(),
      absenceReport: joi.string().valid("Yes", "No").required(),
      // Data of the reporting person
      personalId: joi.string().min(0).max(14).required(),
      phone: joi.string().min(0).max(11).required(),
      governorateVolunteer: joi.string().required(),
      stateCountryVolunteer: joi.string().required(),
      volunteerAddress: joi.string().required()
    })
    .required();