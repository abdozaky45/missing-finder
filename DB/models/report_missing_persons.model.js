import { Schema, Types, model } from "mongoose";
const report_missing_personsSchema = new Schema(
  {
    //Data of the missing person
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },
    fullNameMissing: {
      type: String,
      required: true,
      min: 3,
      max: 50
    },
    missingImage: {
      type: String,
      required: true
    },
    missingGender: {
      type: String,
      enum: ["Male", "Female"],
      required: true
    },
    healthStatus: {
      type: String,
      enum: ["healthy", "sick", "SpecialNeeds"],
      required: true
    },
    age: { type: String, min: 1, max: 2, required: true },
    dateOfLoss: {
      type: Date,
      required: true
    },
    missingPersonClassification: {
      type: String,
      enum: ["Lost", "Kidnapped", "Runaway", "others"],
      required: true
    },
    wherePersonLost: { type: String, required: true },
    absenceReport: {
      type: String,
      enum: ["Yes", "No", "No clue"],
      default: "No clue"
    },
    birthMark: String,
    // Data of the reporting person
    personalId: { type: String, min: 0, max: 14, required: true },
    phone: { type: String, min: 0, max: 11, required: true },
    relationMissingPerson: {
      type: String,
      enum: [
        "first degree relative",
        "second degree relative",
        "third degree relative",
        "others"
      ],
      required: true
    },
    governorateReporter: { type: String, required: true },
    stateCountry: { type: String, required: true },
    reporterAddress: { type: String, required: true }
  },
  { timestamps: true }
);
export const reportMissingPersonsrModel = model(
  "Finder",
  report_missing_personsSchema
);
