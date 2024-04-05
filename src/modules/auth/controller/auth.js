import { asyncHandler } from '../../../utils/errorHandling.js';
import userModel from '../../../../DB/models/user.model.js';
import bcrypt from 'bcryptjs';
import Randomstring from 'randomstring';
import slugify from 'slugify';
import sendEmail from '../../../utils/sendEmail.js';
import { TempConfirmationEmail, tempResetPassword } from '../../../utils/html.js';
import jwk from 'jsonwebtoken';
import tokenModel from '../../../../DB/models/token.model.js';
import { sendSMS } from '../../../utils/sendSMS.js';
import { compare, hash } from '../../../utils/HashAndCompare.js';
export const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, gender, dateOfBirth } = req.body;
  // existence
  const isUser = await userModel.findOne({ email }); //{} , null
  if (isUser)
    return next(new Error('email already registered!', { cause: 408 }));
  // uploud photo
  // if (!req.file)
  //   return next(new Error("personalIdCard is required", { cause: 400 }));
  // const cloudFolder = nanoid();
  // const { secure_url, public_id } = await cloudinary.uploader.upload(
  //   req.file.path,
  //   {
  //     folder: `${process.env.FOLDER_CLOUD_NAME}/personalIdCard/${cloudFolder}`
  //   }
  // );

  //hash password
  const hashPasword = hash({ plaintext: password });
  const code = Randomstring.generate({
    length: 4,
    charset: 'numeric',
  });
  const currentTime = new Date();
  const uniqueNumber = Randomstring.generate({
    length: 1,
    charset: 'numeric',
  });
  const Alphabetic = Randomstring.generate({
    length: 1,
    charset: 'alphabetic',
  });
  const user = await userModel.create({
    firstName,
    lastName,
    userName: slugify(`${firstName}-${lastName}${uniqueNumber}${Alphabetic}`),
    email,
    password: hashPasword,
    dateOfBirth,
    gender,
    activationCode: code,
    createdCodeActivateAccount: currentTime,
    //  personalIdCard: { secure_url, public_id }
  });
  // token activate account
  const token = jwk.sign({ id: user._id }, process.env.EMAIL_SIGNATURE, {
    expiresIn: 60 * 60 * 2,
  });
  const isSend = await sendEmail({
    to: email,
    subject: 'Please activate your account!',
    html: TempConfirmationEmail(firstName, code),
  });
  return isSend
    ? res.json({
      success: true,
      Message: 'check inbox !',
      result: user,
      token_Activate_Account: token,
    })
    : next(new Error('wrong please try agian', { cause: 400 }));

  // if (phone) {
  //   // existence
  //   const isUser = await userModel.findOne({ phone }); //{} , null
  //   if (isUser)
  //     return next(new Error("phone already registered!", { cause: 408 }));
  //   // uploud photo
  //   // if (!req.file)
  //   //   return next(new Error("personalIdCard is required", { cause: 400 }));
  //   // const cloudFolder = nanoid();
  //   // const { secure_url, public_id } = await cloudinary.uploader.upload(
  //   //   req.file.path,
  //   //   {
  //   //     folder: `${process.env.FOLDER_CLOUD_NAME}/personalIdCard/${cloudFolder}`
  //   //   }
  //   // );
  //   //hash password
  //   const hashPasword = bcrypt.hashSync(
  //     password,
  //     parseInt(process.env.SALT_ROUND)
  //   );
  //   const code = Randomstring.generate({
  //     length: 4,
  //     charset: "numeric"
  //   });
  //   const currentTime = new Date();
  //   const uniqueNumber = Randomstring.generate({
  //     length: 1,
  //     charset: "numeric"
  //   });
  //   const Alphabetic = Randomstring.generate({
  //     length: 1,
  //     charset: "alphabetic"
  //   });
  //   const user = await userModel.create({
  //     firstName,
  //     lastName,
  //     userName: slugify(`${firstName}-${lastName}${uniqueNumber}${Alphabetic}`),
  //     phone,
  //     password: hashPasword,
  //     dateOfBirth,
  //     gender,
  //     activationCode: code,
  //     createdCodeActivateAccount: currentTime
  //     // personalIdCard: { secure_url, public_id }
  //   });
  //   // token activate account
  //   const token = jwk.sign({ id: user._id }, process.env.EMAIL_SIGNATURE, {
  //     expiresIn: 60 * 60 * 2
  //   });
  //   await sendSMS(phone, `Please activate your account! - ${code}`);
  //   return res.json({
  //     success: true,
  //     Message: "check SMS!",
  //     result: user,
  //     token_Activate_Account: token
  //   });
  // }
});
export const activateAccount = asyncHandler(async (req, res, next) => {
  const { token } = req.headers;
  const { activationCode } = req.body;
  const currentTime = new Date();
  const validityDuration = 5 * 60 * 1000;
  const decoded = jwk.verify(token, process.env.EMAIL_SIGNATURE);
  const isUser = await userModel.findById(decoded.id);
  if (!isUser) return next(new Error('user not found', { cause: 404 }));
  const codeDocument = await userModel.findOne({ activationCode });
  if (codeDocument) {
    const codeCreationTime = codeDocument.createdCodeActivateAccount;
    const timeDifference = currentTime - codeCreationTime;
    if (timeDifference <= validityDuration) {
      await userModel.findByIdAndUpdate(codeDocument._id, {
        isConfirmed: true,
        $unset: { activationCode: 1, createdCodeActivateAccount: 1 },
      });
      return res.json({ success: true, Message: 'Done Account Active go to login' });
    } else {
      return next(new Error('Expiry verification code', { cause: 400 }));
    }
  } else {
    return next(new Error('The verification code is In-valid', { cause: 400 }));
  }
});
export const ReconfirmAccountActivation = asyncHandler(
  async (req, res, next) => {
    const { token } = req.headers;
    const decoded = jwk.verify(token, process.env.EMAIL_SIGNATURE);
    const code = Randomstring.generate({
      length: 4,
      charset: 'numeric',
    });
    const currentTime = new Date();
    const user = await userModel.findByIdAndUpdate(decoded.id, {
      activationCode: code,
      createdCodeActivateAccount: currentTime,
    });
    if (!user) return next(new Error('Please create a new account'));
    if (user.isConfirmed) return next(new Error('please go to login'));
    if (user.email) {
      const isSend = await sendEmail({
        to: user.email,
        subject: 'Please activate your account!',
        html: TempConfirmationEmail(user.firstName, code),
      });
      return isSend
        ? res.json({
          success: true,
          Message: 'check inbox !',
        })
        : next(new Error('wrong please try agian', { cause: 400 }));
    }
    if (user.phone) {
      await sendSMS(
        user.phone,
        `ReconfirmAccountActivation-Please activate your account! - ${code}`
      );
      return res.json({
        success: true,
        Message: 'check SMS!',
      });
    }
  }
);
export const login = asyncHandler(async (req, res, next) => {
  const { loginKey, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ email: loginKey }, { phone: loginKey }],
  });
  if (!user)
    return next(new Error('You have not created an account', { cause: 400 }));
  if (!user.isConfirmed) {
    const code = Randomstring.generate({
      length: 4,
      charset: 'numeric',
    });
    const currentTime = new Date();
    await sendEmail({
      to: user.email,
      subject: 'Please activate your account!',
      html: TempConfirmationEmail(user.firstName, code),
    });
    user.activationCode = code;
    user.createdCodeActivateAccount = currentTime;
    await user.save();

    return next(new Error('unactivated account!', { cause: 400 }));
  }
  if (!compare({ plaintext: password, hashValue: user.password }))
    return next(new Error('In-valid Email Or Password', { cause: 400 }));
  const token = jwk.sign(
    { id: user._id, userName: user.userName, email: user.email },
    process.env.TOKEN_SIGNATURE,
    { expiresIn: '2d' }
  );
  await tokenModel.create({
    token,
    user: user._id,
    agent: req.headers['user-agent'],
  });
  user.status = 'online';
  await user.save();
  return res
    .status(200)
    .json({ success: true, Message: 'go to home page', auth: token });
});
export const sendForgetPasswordCodeEmail = asyncHandler(
  async (req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return next(new Error('This account is not available', { cause: 400 }));
    const code = Randomstring.generate({
      length: 4,
      charset: 'numeric',
    });
    const currentTime = new Date();
    user.forgetCode = code;
    user.createdCodeResetPassword = currentTime;
    await user.save();
    const isSend = await sendEmail({
      to: user.email,
      subject: 'Reset your password!',
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
export const ReconfirmResetPasswordEmail = asyncHandler(
  async (req, res, next) => {
    const { email } = req.body;
    const code = Randomstring.generate({
      length: 4,
      charset: 'numeric',
    });
    const currentTime = new Date();
    const user = await userModel.findOneAndUpdate(
      { email },
      {
        forgetCode: code,
        createdCodeResetPassword: currentTime,
      }
    );
    if (!user) return next(new Error('user not found', { cause: 404 }));
    const isSend = await sendEmail({
      to: user.email,
      subject: 'Reset your password!',
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
export const codeResetPasswordWithEmail = asyncHandler(
  async (req, res, next) => {
    const { forgetCode, email } = req.body;
    const currentTime = new Date();
    const validityDuration = 5 * 60 * 1000;
    const isUser = await userModel.findOne({ email });
    if (!isUser) return next(new Error('user not found', { cause: 404 }));
    const codeDocument = await userModel.findOne({ forgetCode });
    if (codeDocument) {
      const codeCreationTime = codeDocument.createdCodeResetPassword;
      const timeDifference = currentTime - codeCreationTime;
      if (timeDifference <= validityDuration) {
        await userModel.findOneAndUpdate(
          { email },
          {
            $unset: { forgetCode: 1, createdCodeResetPassword: 1 },
          }
        );

        return res.json({
          success: true,
          Message: 'The code you entered is correct',
        });
      } else {
        return next(new Error('Expiry verification code', { cause: 400 }));
      }
    } else {
      return next(
        new Error('The verification code is In-valid', { cause: 400 })
      );
    }
  }
);
export const ResetPasswordWithEmail = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return next(new Error('In-valid Email', { cause: 400 }));
  user.password = hash({ plaintext: password });
  await user.save();
  const tokens = await tokenModel.find({ user: user._id });
  tokens.forEach(async token => {
    token.isValid = false;
    await token.save();
  });
  return res.json({ success: true, Message: 'Done' });
});
export const sendForgetPasswordCodePhone = asyncHandler(
  async (req, res, next) => {
    const { phone } = req.body;
    const user = await userModel.findOne({ phone });
    if (!user)
      return next(new Error('This account is not available', { cause: 400 }));
    const code = Randomstring.generate({
      length: 4,
      charset: 'numeric',
    });
    const currentTime = new Date();
    user.forgetCode = code;
    user.createdCodeResetPassword = currentTime;
    await user.save();
    await sendSMS(phone, `Reset your password code! - ${code}`);
    return res.json({
      success: true,
      Message: 'check SMS!',
    });
  }
);
export const ReconfirmResetPasswordPhone = asyncHandler(
  async (req, res, next) => {
    const { phone } = req.body;
    const code = Randomstring.generate({
      length: 4,
      charset: 'numeric',
    });
    const currentTime = new Date();
    const user = await userModel.findOneAndUpdate(
      { phone },
      {
        forgetCode: code,
        createdCodeResetPassword: currentTime,
      }
    );
    if (!user) return next(new Error('user not found', { cause: 404 }));
    await sendSMS(phone, `Please activate your account! - ${code}`);
    return res.json({
      success: true,
      Message: 'check SMS!',
    });
  }
);
export const codeResetPasswordPhone = asyncHandler(async (req, res, next) => {
  const { forgetCode, phone } = req.body;
  const currentTime = new Date();
  const validityDuration = 5 * 60 * 1000;
  const isUser = await userModel.findOne({ phone });
  if (!isUser) return next(new Error('user not found', { cause: 404 }));
  const codeDocument = await userModel.findOne({ forgetCode });
  if (codeDocument) {
    const codeCreationTime = codeDocument.createdCodeResetPassword;
    const timeDifference = currentTime - codeCreationTime;
    if (timeDifference <= validityDuration) {
      await userModel.findOneAndUpdate(
        { phone },
        {
          $unset: { forgetCode: 1, createdCodeResetPassword: 1 },
        }
      );
      return res.json({
        success: true,
        Message: 'The code you entered is correct',
      });
    } else {
      return next(new Error('Expiry verification code', { cause: 400 }));
    }
  } else {
    return next(new Error('The verification code is In-valid', { cause: 400 }));
  }
});
export const resetPasswordWithPhone = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;
  const user = await userModel.findOne({ phone });
  if (!user) return next(new Error('In-valid phone', { cause: 400 }));
  user.password = hash({ plaintext: password });
  await user.save();
  const tokens = await tokenModel.find({ user: user._id });
  tokens.forEach(async token => {
    token.isValid = false;
    await token.save();
  });
  return res.json({ success: true, Message: 'Done' });
});

