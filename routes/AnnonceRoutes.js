import express from "express";
import {
  createAnnonce,
  getAnnoncesByUser,
  getAllAnnonces,
  getAnnonceBySlug,
  getAnnonceById,
  updateAnnonce,
  deleteAnnonce,
} from "../controllers/annonceController.js";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

router.post("/create-annonce", verifyToken, createAnnonce);
router.get("/user-annonce", verifyToken, getAnnoncesByUser);
router.get("/all-annonce", getAllAnnonces);
router.get("/annonce/:slug", getAnnonceBySlug);
router.get("/get-annonce/:id", verifyToken, getAnnonceById);
router.put("/update-annonce/:id", verifyToken, updateAnnonce);
router.delete("/delete-annonce/:id", verifyToken, deleteAnnonce);

export default router;
