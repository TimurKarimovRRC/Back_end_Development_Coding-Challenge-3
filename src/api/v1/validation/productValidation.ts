import Joi from "joi";

export const createProductSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().min(2).max(80).required(),
  sku: Joi.string().pattern(/^[A-Z]{3}\d{4}$/).required(),
  quantity: Joi.number().integer().min(0).required(),
  price: Joi.number().positive().precision(2).required(),
  category: Joi.string().valid("electronics", "clothing", "food", "tools", "other").required()
});

export const updateProductSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().min(2).max(80),
  quantity: Joi.number().integer().min(0),
  price: Joi.number().positive().precision(2),
  category: Joi.string().valid("electronics", "clothing", "food", "tools", "other")
}).min(1);