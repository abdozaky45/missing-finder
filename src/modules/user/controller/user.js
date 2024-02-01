import userModel from "../../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const users = asyncHandler(async (req, res, next) => {
  const user = await userModel
    .find({})
    .select(
      "firstName lastName email phone password gender personalIdCard dateOfBirth"
    );
  return res.json({ success: true, result: user });
});
export const deleteUser = asyncHandler(async (req, res, next) => {
  await userModel.findByIdAndDelete(req.params._id);
  return res.json({ success: true, Message: "deleted user" });
});
