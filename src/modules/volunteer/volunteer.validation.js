import joi from "joi";
export const addFoundPerson = joi
  .object({
    NameFoundPerson: joi.string().min(3).max(50).required(),
    MissingPersonInformation: joi
      .string()
      .valid(
        "The Person Himself Confirmed His Name",
        "Not sure of his/her identity",
        "Don't Know"
      )
      .required(),
    FoundPersonGender: joi.string().valid("Male", "Female").required(),
    HealthStatus: joi
      .string()
      .valid("healthy", "sick", "SpecialNeeds")
      .required(),
    Age: joi.string().min(1).max(2),
    MetMissingPerson: joi.string().required(),
    governorateFoundPerson: joi.string().required(),
    stateCountryFoundPerson: joi.string().required(),
    AddressFoundPerson: joi.string().required(),
    MissingClothes: joi.string(),
    absenceReport: joi.string().valid("Yes", "No").required(),
    // Data of the reporting person
    personalId: joi.string().min(0).max(14).required(),
    phone: joi.string().min(0).max(11).required(),
    governorateVolunteer: joi.string().required(),
    stateCountryVolunteer: joi.string().required(),
    volunteerAddress: joi.string().required()
  })
  .required();
