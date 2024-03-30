import tokenModel from '../../DB/models/token.model.js';
import userModel from '../../DB/models/user.model.js';
import { asyncHandler } from '../utils/errorHandling.js';
import jwk from 'jsonwebtoken';
export const auth = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith(process.env.BEARER_TOKEN))
    return next(
      new Error('authorization is required or in-valid Bearer Key', {
        cause: 400,
      })
    );

  const token = authorization.split(process.env.BEARER_TOKEN)[1];
  const decoded = jwk.verify(token, process.env.TOKEN_SIGNATURE);

  if (!decoded?.id)
    return next(new Error("in-valid token payload", { cause: 400 }));

  const tokenDB = await tokenModel.findOne({ token, isValid: true });
  if (!tokenDB) return next(new Error('token expired', { cause: 401 }));

  const user = await userModel.findById(decoded.id);
  if (!user) return next(new Error('Not register account', { cause: 401 }));

  req.user = user;
  return next();
});
