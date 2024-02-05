import { Schema, Types, model } from "mongoose";
const FinderSchema = new Schema(
  {
    //Data of the missing person
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },
    fullNameFinder: {
      type: String,
      required: true,
      min: 3,
      max: 50
    },
    finderImage: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true }
    },
    finderGender: {
      type: String,
      enum: ["Male", "Female"],
      required: true
    },
    HealthStatus: {
      type: String,
      enum: ["healthy", "sick", "SpecialNeeds"],
      required: true
    },
    Age: { type: String, min: 1, max: 2, required: true },
    DateOfLoss: {
      type: Date,
      default: Date.now
    },
    MissingPersonClassification: {
      type: String,
      enum: [" Lost", "  Kidnapped", " Runaway", "others"],
      required: true
    },
    WherePersonLost: { type: String, required: true },
    absenceReport: {
      type: String,
      enum: ["Yes", "No", "No clue"],
      default: "No clue"
    },
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
    governorateReporter: { type: String, required: true },  
    stateCountry: { type: String, required: true }, 
    ReporterAddress: { type: String, required: true }
  },
  { timestamps: true }
);
export const finderModel = model("Finder", FinderSchema);
