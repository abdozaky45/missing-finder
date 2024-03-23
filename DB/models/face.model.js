import { Schema, Types, model } from "mongoose";
const faceSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true
  },
  descriptions: {
    type: Array,
    required: true
  },
});
const faceModel = model("Face", faceSchema);
export default faceModel;
