import { Types } from "mongoose";
export const isValidObjectId = (value, helper) => {
    return Types.ObjectId.isValid(value)
        ? true
        : helper.message("in-valid-id !!");
};
export const validation = (joiSchema) => {
    return (req, res, next) => {
        const allDataAllMethods = { ...req.body, ...req.params, ...req.query };
        const validationResult = joiSchema.validate(allDataAllMethods, { abortEarly: false });
        if (validationResult.error) {
            const MessageError = validationResult.error.details;
            return res.status(401).json({ Message: "validationError!", MessageError });
        }
        return next();
    }
}
