const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const createProductValidation = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
  price: Joi.number().required(),
  image: Joi.objectId(),
  category: Joi.objectId(),
});

const updateProductValidation = Joi.object({
  name: Joi.string().min(2),
  description: Joi.string().min(2),
  price: Joi.number(),
  image: Joi.objectId(),
  category: Joi.objectId(),
});

module.exports = { createProductValidation, updateProductValidation };
