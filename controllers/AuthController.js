const { userModel } = require("../models/UserModels");
const authMiddlewares = require("../middlewares/AuthMiddlewares");

exports.register = async (req, res) => {
  const { nom, prenom, email, password, role } = req.body;
  try {
    const user = new userModel({ nom, prenom, email, password, role });
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      res.status(500).json({ error: "Cet utilisateur existe déjà" });
    }

    await user.save();
    res
      .status(201)
      .json({ user: user, message: "Utilisateur créé avec succès" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const token = authMiddlewares.createToken(user);
    res
      .status(200)
      .json({
        id: user._id,
        name: `${user.nom} ${user.prenom}`,
        nom: user.nom,
        prenom: user.prenom,
        email,
        token,
        role: user.role,
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Déconnexion réussie" });
};
