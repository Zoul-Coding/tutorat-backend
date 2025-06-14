import ExperienceModels from "../models/ExperienceModels.js"
import { experienceSchema } from "../validators/experienceValidation.js";

export const createExperience = async (req, res) => {
  try {
    const { error, value } = experienceSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newExperience = new ExperienceModels(value);
    const saved = await newExperience.save();

    res.status(201).json({
      message: "Experience créée avec succès !",
      experience: saved,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
