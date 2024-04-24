import tokenModel from "../../../../DB/models/token.model.js";
import userModel from "../../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import bcrypt from 'bcryptjs';
import Randomstring from 'randomstring';
import sendEmail from "../../../utils/sendEmail.js";
import { tempResetPassword } from "../../../utils/html.js";
import faceModel from "../../../../DB/models/face.model.js";
import { volunteerModel } from "../../../../DB/models/volunteer.model.js";
import { reportMissingPersonsrModel } from "../../../../DB/models/report_missing_persons.model.js";
import { compare, hash } from "../../../utils/HashAndCompare.js";
import cloudinary from "../../../utils/cloudinary.js";
export const users = asyncHandler(async (req, res, next) => {
  const user = await userModel
    .find({})
    .select(
      "firstName lastName email password gender  dateOfBirth"
    );
  return res.json({ success: true, result: user });
});
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params._id);
  if (!user) return next(new Error("In-valid userId!"))
  await userModel.findByIdAndDelete(req.params._id);
  return res.json({ success: true, Message: "deleted user" });
});
export const changePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const user = await userModel.findById(req.user._id);
  if (!compare({ plaintext: currentPassword, hashValue: user.password }))
    return next(new Error('In-valid Password', { cause: 400 }));
  user.password = hash({ plaintext: newPassword });
  await user.save();
  const tokens = await tokenModel.find({ user: user._id });
  tokens.forEach(async token => {
    token.isValid = false;
    await token.save();
  });
  return res.json({
    success: true,
    Message: 'The active password has been changed',
  });
});
export const sendCodeDeleteAccount = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user)
    return next(
      new Error(
        'Enter the email with which you previously created the account',
        { cause: 400 }
      )
    );
  if (!compare({ plaintext: password, hashValue: user.password }))
    return next(new Error('In-valid Email Or Password', { cause: 400 }));
  const code = Randomstring.generate({
    length: 4,
    charset: 'numeric',
  });
  const currentTime = new Date();
  user.codeDeleteAccount = code;
  user.createdCodeDeleteAccount = currentTime;
  await user.save();
  const isSend = await sendEmail({
    to: email,
    subject: 'Are you sure you want to delete your account?!',
    html: tempResetPassword(user.firstName, code),
  });
  return isSend
    ? res.json({
      success: true,
      Message: 'check inbox !',
    })
    : next(new Error('wrong please try agian', { cause: 400 }));
});
export const deleteAccount = asyncHandler(async (req, res, next) => {
  const { code } = req.body;
  const currentTime = new Date();
  const validityDuration = 5 * 60 * 1000;
  const codeDocument = await userModel.findOne({ codeDeleteAccount: code });
  if (codeDocument) {
    const codeCreationTime = codeDocument.createdCodeDeleteAccount;
    const timeDifference = currentTime - codeCreationTime;
    if (timeDifference <= validityDuration) {
      const gusets = await volunteerModel.findOne({ userId: codeDocument._id });
      // volunteer
      if (gusets) {
        for (const image of gusets.images) {
          await cloudinary.uploader.destroy(image.public_id);
        }
        await faceModel.deleteMany({ reportMissingPersonId: gusets._id });
        await volunteerModel.findByIdAndDelete(gusets._id);
      }
      const reporter = await reportMissingPersonsrModel.findOne({ userId: codeDocument._id });
      // reporter 
      if (reporter) {
        for (const image of reporter.images) {
          await cloudinary.uploader.destroy(image.public_id);
        }
        await faceModel.deleteMany({ reportMissingPersonId: reporter._id });
        await reportMissingPersonsrModel.findByIdAndDelete(reporter._id);
      }
      await tokenModel.deleteMany({ user: codeDocument._id });
      await userModel.findByIdAndDelete(codeDocument._id);
      return res.json({
        success: true,
        Message: 'The account has been deleted successfully',
      });
    } else {
      return next(new Error('Expiry verification code', { cause: 400 }));
    }
  } else {
    return next(new Error('The verification code is In-valid', { cause: 400 }));
  }
});
export const resendSendCodeDeleteAccount = asyncHandler(
  async (req, res, next) => {
    const code = Randomstring.generate({
      length: 4,
      charset: 'numeric',
    });
    const currentTime = new Date();
    const user = await userModel.findByIdAndUpdate(req.user._id, {
      codeDeleteAccount: code,
      createdCodeDeleteAccount: currentTime,
    });
    if (!user) return next(new Error('user not found', { cause: 404 }));
    const isSend = await sendEmail({
      to: user.email,
      subject: 'Enter the email with which you previously created the account!',
      html: tempResetPassword(user.firstName, code),
    });
    return isSend
      ? res.json({
        success: true,
        Message: 'check inbox !',
      })
      : next(new Error('wrong please try agian', { cause: 400 }));
  }
);