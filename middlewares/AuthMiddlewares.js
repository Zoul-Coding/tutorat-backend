import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModels.js";

export const createToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Vous n'êtes pas connecté." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Erreur de vérification du token:", err.message);
    res.status(401).json({ error: "Token invalide." });
  }
};
