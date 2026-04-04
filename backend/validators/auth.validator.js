import Joi from "joi";

const registerSchema = Joi.object({
  fullName: Joi.string().required().messages({
    "string.empty": "Full Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password is required",
  }),
});

export default registerSchema;
