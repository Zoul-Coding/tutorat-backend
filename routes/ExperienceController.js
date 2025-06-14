import express from "express";
import { createExperience } from "../controllers/experienceController.js";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

router.post("/create-experience", verifyToken, createExperience);

export default router;