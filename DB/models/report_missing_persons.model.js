import { Schema, Types, model } from "mongoose";
const report_missing_personsSchema = new Schema(
  {
    //Data of the missing person
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },
    image: 
      {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    fullNameMissing: {
      type: String,
      required: true,
      min: 3,
      max: 50
    },
    fullName: {
      type: String,
      required: true,
      min: 3,
      max: 50
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
    age: { type:Number, min: 1, max: 100, required: true },
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
    city: { type: String, required: true },
    country: { type: String, required: true },
    birthMark: String,
    // Data of the reporting person
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
  },
  { timestamps: true }
);
export const reportMissingPersonsrModel = model(
  "Finder",
  report_missing_personsSchema
);
