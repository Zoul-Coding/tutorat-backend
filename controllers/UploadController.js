import { UserModel } from "../models/UserModels.js";

export const UploadProfilePhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Aucune image téléchargée" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  try {
    const userId = req.user._id;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { photo: imageUrl },
      { new: true }
    );

    res.status(200).json({
      message: "Photo de profil mise à jour avec succès",
      imageUrl: updatedUser.imageUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour de la photo" });
  }
};

export const getUserInfos = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await UserModel.findById(userId).select("nom prenom email verified phone photo");

    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des infos utilisateur" });
  }
};

