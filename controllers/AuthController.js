import { registerSchema, loginSchema } from "../validators/userValidator.js";
import { UserModel } from "../models/UserModels.js";
import { sendOtpEmail } from "../utils/sendEmail.js";
import { createToken } from "../middlewares/AuthMiddlewares.js";

export const register = async (req, res) => {
  try {
    console.log("Données reçues :", req.body);
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { prenom, nom, email, phone, password } = value;    

    const userExists = await UserModel.findOne({ email });
    if (userExists)
      return res.status(409).json({ error: "Email déjà utilisé." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new UserModel({
      prenom,
      nom,
      email,
      phone,
      password,
      otp,
      otpExpires,
    });

    await newUser.save();
    await sendOtpEmail(email, otp);

    res
      .status(201)
      .json({
        users: newUser,
        message: "Utilisateur créé. Veuillez vérifier votre email.",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = value;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    if (!user.verified) {
      return res
        .status(403)
        .json({
          error: "Veuillez vérifier votre email avant de vous connecter.",
        });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const token = createToken(user);

     return res.status(200).json({
      data: {
        id: user._id,
        name: `${user.nom} ${user.prenom}`,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });

  if (user.verified) return res.status(400).json({ error: "Déjà vérifié." });

  if (user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ error: "OTP invalide ou expiré." });
  }

  user.verified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.status(200).json({ message: "Email vérifié avec succès." });
};
