import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    firstName: { type: String, required: true, min: 3, max: 20 },
    lastName: { type: String, required: true, min: 3, max: 20 },
    userName: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 30
    },
    email: { type: String, lowercase: true },
    password: { type: String, required: true },
    personalIdCard: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true }
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male"
    },
    phone: { type: String },
    isConfirmed: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline"
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    forgetCode: String,
    activationCode: String,
    createdCodeActivateAccount: Date,
    createdCodeResetPassword: Date
  },
  { timestamps: true }
);
const userModel = model("User", userSchema);
export default userModel;
