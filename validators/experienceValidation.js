import Joi from "joi";

export const experienceSchema = Joi.object({
  userId: Joi.string().required(),
  schoolName: Joi.string().min(2).required(),
  type: Joi.string().optional().allow(""),
  startMonth: Joi.string().optional().allow(""),
  startYear: Joi.string().optional().allow(""),
  endMonth: Joi.string().optional().allow(""),
  endYear: Joi.string().optional().allow(""),
  description: Joi.string().optional().allow(""),
});
