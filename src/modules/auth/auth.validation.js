import joi from "joi";
export const registerSchema = joi
  .object({
    firstName: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(20).required(),
    email: joi.string().email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: {
        allow: ["com", "net"]
      }
    }),
    password: joi
      .string()
      .pattern(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&*])"))
      .required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
    dateOfBirth: joi.date().required(),
    gender: joi.string().valid("Male", "Female").required(),
    phone: joi.string().max(11)
  })
  .required();
export const activateAccountSchema = joi
  .object({
    activationCode: joi.string().max(4).required()
  })
  .required();
export const forgetCodeSchema = joi
  .object({
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: {
          allow: ["com", "net"]
        }
      })
      .required()
  })
  .required();
export const resetPasswordSchema = joi
  .object({
    forgetCode: joi.string().max(4).required(),
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: {
          allow: ["com", "net"]
        }
      })
      .required(),
    password: joi
      .string()
      .pattern(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&*])"))
      .required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required()
  })
  .required();
export const reconfirmResetPassSchema = joi
  .object({
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: {
          allow: ["com", "net"]
        }
      })
      .required()
  })
  .required();
export const loginSchema = joi
  .object({
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: {
          allow: ["com", "net"]
        }
      })
      .required(),
    password: joi
      .string()
      .pattern(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&*])"))
      .required()
  })
  .required();
