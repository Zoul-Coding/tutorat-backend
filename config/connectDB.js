const mongoose = require("mongoose");
const createAdminIfNotExists = require('../seed/createAdmin');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connexion à MongoDB réussie ✅');
    createAdminIfNotExists();
  })
  .catch(err => {
    console.error('Erreur de connexion à MongoDB ❌', err);
  });
