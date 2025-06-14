import AnnonceModels from "../models/AnnonceModels.js";
import { UserModel } from "../models/UserModels.js";
import { Certificate } from "../models/CertificateModels.js";
import ExperienceModels from "../models/ExperienceModels.js"
import { annonceSchema } from "../validators/annonceValidator.js";

export const createAnnonce = async (req, res) => {
  try {
    const { error, value } = annonceSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const userId = req.user.id;

    const newAnnonce = await AnnonceModels.create({
      ...value,
      utilisateur: userId,
      statut: "inactive",
      isActive: false,
    });

    res.status(201).json({
      message: "Annonce créée avec succès !",
      annonce: newAnnonce,
    });

  } catch (error) {
    console.error("Erreur lors de la création de l'annonce:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const getAnnoncesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const annonces = await AnnonceModels.find({ utilisateur: userId }).lean();

    const formatted = annonces.map((annonce) => ({
      id: annonce._id,
      title: annonce.titre,
      price: annonce.tarif + " €",
      location: annonce.lieu,
      subjects: [annonce.matiere],
      status: annonce.statut,
      isActive: annonce.isActive,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const getAllAnnonces = async (req, res) => {
  try {
    const annonces = await AnnonceModels.find()
      .populate({
        path: "utilisateur",
        select: "nom prenom photo",
      })
      .lean();

    const annonceAvecDetails = await Promise.all(
      annonces.map(async (annonce) => {
        const user = annonce.utilisateur;

        const certificate = await Certificate.findOne({
          userId: user._id,
        }).select("schoolName");

        return {
          id: annonce._id,
          nom: user?.nom || "",
          prenom: user?.prenom || "",
          photo: user?.photo || "",
          schoolName: certificate?.schoolName || null,
          introduction: annonce.introduction || "",
          price: annonce.tarif || 0,
          lieu: annonce.lieu || "",
        };
      })
    );

    res.status(200).json(annonceAvecDetails);
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getAnnonceBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    // Récupérer l'utilisateur dont le prénom correspond au slug
    const user = await UserModel.findOne({ prenom: slug });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Récupérer la première annonce associée à cet utilisateur
    const annonce = await AnnonceModels.findOne({ utilisateur: user._id }).lean();

    if (!annonce) {
      return res.status(404).json({ message: "Annonce non trouvée." });
    }

    // Récupérer les certificats du user
    const certificates = await Certificate.find({ userId: user._id }).lean();

    // Récupérer les expériences du user
    const experiences = await ExperienceModels.find({ userId: user._id }).lean();

    // Construction de la réponse
    const annonceDetails = {
      annonce: {
        id: annonce._id,
        titre: annonce.titre,
        matiere: annonce.matiere,
        niveau: annonce.niveau,
        introduction: annonce.introduction,
        lieu: annonce.lieu,
        tarif: annonce.tarif,
        methodologie: annonce.methodologie,
        statut: annonce.statut,
        isActive: annonce.isActive,
      },
      user: {
        id: user._id,
        name: user.name,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        photo: user.photo,
        location: user.location,
      },
      certificates,
      experiences,
    };

    res.status(200).json(annonceDetails);
  } catch (error) {
    console.error("Erreur lors de la récupération de l’annonce:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
