import { Schema, Types, model } from "mongoose";
const FinderSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  finderImage: {
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
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
  fullName: {
    type: String,
    required: true,
    min: 3,
    max: 50
  },
  finderGender: {
    type: String,
    enum: ["Male", "Female"],
    required: true
  },
  dateOfbrithFinder: {
    type: Date,
    required: true
  },
  PhoneResponsibleFinder: {
    type: String,
    required: true
  },
  DateOfLoss: {
    type: Date,
    default: Date.now
  },
  HealthStatusFinder: String,
  birthMark: String,
  DescriptionMissingPerson: String
});
export const finderModel = model("FINDER", FinderSchema);
