import mongoose from "mongoose";

const annonceSchema = new mongoose.Schema(
  {
    titre: String,
    matiere: String,
    niveau: String,
    introduction: String,
    lieu: String,
    tarif: Number,
    methodologie: String,
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    statut: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Annonce", annonceSchema);