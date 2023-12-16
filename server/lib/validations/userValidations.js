const Joi = require("joi");

const registerValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const updateUserValidation = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  currentPassword: Joi.when("password", {
    is: Joi.exist(),
    then: Joi.string().min(8).required(),
    otherwise: Joi.forbidden(), // This ensures that currentpassword is not present if password is not present
  }),
});

module.exports = { registerValidation, loginValidation, updateUserValidation };
