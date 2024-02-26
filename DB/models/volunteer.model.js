import { Schema, model, Types } from "mongoose";
const volunteerSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },
    nameFoundPerson: {
      type: String,
      min: 3,
      max: 50
    },
    missingPersonInformation: {
      type: String,
      required: true,
      enum: [
        "The Person Himself Confirmed His Name",
        "Not sure of his/her identity",
        "Don't Know"
      ]
    },
    imageFoundPerson: {
      type: String,
      required: true
    },
    foundPersonGender: {
      type: String,
      enum: ["Male", "Female"],
      required: true
    },
    healthStatus: {
      type: String,
      enum: ["healthy", "sick", "SpecialNeeds"],
      required: true
    },
    age:{type:Number,min:1,max:100},
    metMissingPerson: { type: String, required: true },
    governorateFoundPerson: { type: String, required: true },
    stateCountryFoundPerson: { type: String, required: true },
    addressFoundPerson: { type: String, required: true },
    missingClothes: String,
    absenceReport: { type: String, enum: ["Yes", "No"], default: "No" },
    // Data of the reporting person
    personalId: { type: String,min:0,max:14, required: true, },
    phone: { type: String, min: 0, max: 11, required: true },
    governorateVolunteer: { type: String, required: true },
    stateCountryVolunteer: { type: String, required: true },
    volunteerAddress: { type: String, required: true }
  },
  { timestamps: true }
);
export const volunteerModel = model("Guset", volunteerSchema);
