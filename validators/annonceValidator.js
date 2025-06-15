import Joi from "joi";

export const annonceSchema = Joi.object({
  titre: Joi.string().min(5).max(100).required(),
  matiere: Joi.string().min(2).required(),
  niveau: Joi.string().min(2).required(),
  introduction: Joi.string().min(10).required(),
  lieu: Joi.string().min(2).required(),
  tarif: Joi.number().min(0).required(),
  methodologie: Joi.string().min(10).required(),
});

export const updateAnnonceSchema = Joi.object({
  titre: Joi.string().required(),
  matiere: Joi.string().required(),
  niveau: Joi.string().required(),
  introduction: Joi.string().required(),
  lieu: Joi.string().required(),
  tarif: Joi.number().required(),
  methodologie: Joi.string().required(),
});

