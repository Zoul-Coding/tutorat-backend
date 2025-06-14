import Joi from "joi";

export const experienceSchema = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().min(5).required(),
  type: Joi.string().min(1).required(),
  startMonth: Joi.string().optional().allow(""),
  startYear: Joi.string().optional().allow(""),
  endMonth: Joi.string().optional().allow(""),
  endYear: Joi.string().optional().allow(""),
  description: Joi.string().optional().allow(""),
});
