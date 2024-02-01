import joi from "joi";
import { Types } from "mongoose";
const isValidObjectId = (value, helper) => {
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("In-valid ObjectId");
};
export const deleteUser = joi
  .object({
    _id: joi.string().custom(isValidObjectId).required()
  })
  .required();
