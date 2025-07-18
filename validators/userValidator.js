import Joi from "joi";

export const registerSchema = Joi.object({
  prenom: Joi.string().min(2).required(),
  nom: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(8).max(20).required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});