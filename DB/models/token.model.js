import { Schema, Types, model } from "mongoose";

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    agent: {
      type: String
    },
    expiredAt: String
  },
  { timestamps: true }
);
const tokenModel = model("Token", tokenSchema);
export default tokenModel;
