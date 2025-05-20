const { userModel } = require('../models/UserModels');

const createAdminIfNotExists = async () => {
  const adminExists = await userModel.findOne({ email: "admin@entreprise.com" });

  if (!adminExists) {
    await userModel.create({
      nom: "Super",
      prenom: "Admin",
      email: "admin@entreprise.com",
      password: "admin123",
      role: "admin"
    });
    console.log("Admin créé avec succès.");
  } else {
    console.log("Admin déjà présent.");
  }
};

module.exports = createAdminIfNotExists;
