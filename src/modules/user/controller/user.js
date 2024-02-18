import userModel from "../../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const users = asyncHandler(async (req, res, next) => {
  const user = await userModel
    .find({})
    .select(
      "firstName lastName email phone password gender personalIdCard dateOfBirth"
    );
    console.log("test")
    console.log("tesssssssssssssst");
    console.log("tesssssssssssssstttttttttttt");
  return res.json({ success: true, result: user });
});
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params._id);
  if(!user) return next(new Error("In-valid userId!"))
  await userModel.findByIdAndDelete(req.params._id);
  return res.json({ success: true, Message: "deleted user" });
});
