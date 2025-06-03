import { Certificate } from "../models/CertificateModels.js";
import { certificateSchema } from "../validators/certificateValidation.js";

export const createCertificate = async (req, res) => {
  try {
    const { error, value } = certificateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const certificate = new Certificate(value);
    const savedCertificate = await certificate.save();

    res.status(201).json(savedCertificate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
