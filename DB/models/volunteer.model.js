import { Schema, model, Types } from "mongoose";
const volunteerSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },
    NameFoundPerson: {
      type: String,
      min: 3,
      max: 50
    },
    MissingPersonInformation: {
      type: String,
      required: true,
      enum: [
        "The Person Himself Confirmed His Name",
        "Not sure of his/her identity",
        "Don't Know"
      ]
    },
    ImageFoundPerson: {
      type: String,
      required: true
    },
    FoundPersonGender: {
      type: String,
      enum: ["Male", "Female"],
      required: true
    },
    HealthStatus: {
      type: String,
      enum: ["healthy", "sick", "SpecialNeeds"],
      required: true
    },
    Age: String,
    MetMissingPerson: { type: String, required: true },
    governorateFoundPerson: { type: String, required: true },
    stateCountryFoundPerson: { type: String, required: true },
    AddressFoundPerson: { type: String, required: true },
    MissingClothes: String,
    absenceReport: { type: String, enum: ["Yes", "No"], default: "No" },
    // Data of the reporting person
    phone: { type: String, min: 0, max: 11, required: true },
    governorateVolunteer: { type: String, required: true },
    stateCountryVolunteer: { type: String, required: true },
    volunteerAddress: { type: String, required: true }
  },
  { timestamps: true }
);
export const volunteerModel = model("Guset", volunteerSchema);
