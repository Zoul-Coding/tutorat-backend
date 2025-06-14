import express from "express";
import { createAnnonce, getAnnoncesByUser, getAllAnnonces, getAnnonceBySlug } from "../controllers/annonceController.js";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

router.post("/create-annonce", verifyToken, createAnnonce);
router.get("/user-annonce", verifyToken, getAnnoncesByUser);
router.get("/all-annonce", getAllAnnonces);
router.get("/annonce/:slug", getAnnonceBySlug);

export default router;