const jwt = require("jsonwebtoken");
const { userModel } = require("../models/UserModels");

exports.createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

exports.verifyToken = async(req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Vous devez etre connecté pour accéder à ce module" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalide" });
  }
};
