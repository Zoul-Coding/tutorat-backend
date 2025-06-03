import express from "express";
import { createExperience } from "../controllers/experienceController.js";

const router = express.Router();

router.post("/experience", createExperience);

export default router;