import joi from "joi";
export const changePassword = joi
    .object({
        currentPassword: joi.string().required(),
        newPassword: joi
            .string()
            .pattern(RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
            .required(),
        confirmPassword: joi.string().valid(joi.ref('newPassword')).required(),
    })
    .required();
export const sendCodeDeleteAccount = joi
    .object({
        email: joi.string().required(),
        password: joi.string().required()
    })
    .required();
export const deleteAccount = joi
    .object({
        code: joi.string().required(),
    })
    .required();
