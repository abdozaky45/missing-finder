import { Schema, model, Types } from "mongoose";
const gusetSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },
    NameFinder: {
      type: String,
      required: true,
      min: 3,
      max: 50
    },
    MissingPersonInformation: {
      type: String,
      required: true,
      enum: [
        "The Person Himself Confirmed His Name",
        "Not sure of his/her identity",
        "don't no"
      ]
    },
    ImageFinder: {
      type: String,
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true }
    },
    FinderGender: {
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
    governorateFinder: { type: String, required: true },
    centerFinder: { type: String, required: true },
    MissingAddress: { type: String, required: true },
    MissingClothes: String,
    absenceReport: { type: String, enum: ["true", "false"], default: "false" },
    // Data of the reporting person
    phone: { type: String, min: 0, max: 11, required: true },
    governorateReporter: { type: String, required: true },
    centerReporter: { type: String, required: true },
    ReporterAddress: { type: String, required: true }
  },
  { timestamps: true }
);
export const gusetModel = model("Guset", gusetSchema);
