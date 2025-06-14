import Joi from "joi";

export const certificateSchema = Joi.object({
  userId: Joi.string().required(),
  schoolName: Joi.string().min(2).required(),
  diplome: Joi.string().min(2).required(),
  domaine: Joi.string().min(2).required(),
  startMonth: Joi.string().optional().allow(""),
  startYear: Joi.string().optional().allow(""),
  endMonth: Joi.string().optional().allow(""),
  endYear: Joi.string().optional().allow(""),
  description: Joi.string().optional().allow(""),
});
